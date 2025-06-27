import { Asset } from "../../model/asset";
import NotFound from "../../errors/not-found";
import { User } from "../../model";

// --- Tipe data untuk Aset ---
interface CreateAssetData {
    assetName: string,
    assetType: string;
    assetCategory: string;
    amount: number;
    description: string;
    createdAt?: Date;
}
interface UpdateAssetData {
    assetType?: string;
    assetCategory?: string;
    amount?: number;
    description?: string;
    createdAt?: Date;
}

class AssetService {
    async createAsset(data: CreateAssetData, userId: number): Promise<Asset> {
        const asset = await Asset.create({
            assetName: data.assetName,
            assetType: data.assetType,
            assetCategory: data.assetCategory,
            amount: data.amount,
            description: data.description,
            createdAt: data.createdAt,
            userId: userId,
        });
        return asset;
    }

    async getAllAssets(userId: number): Promise<Asset[]> {
        return await Asset.findAll({ where: { userId }, order: [['createdAt', 'DESC']], include: { model: User, as: "user" } });
    }

    async getAssetById(id: number, userId: number): Promise<Asset | null> {
        return await Asset.findOne({ where: { assetId: id, userId }, include: { model: User, as: "user" } });
    }

    async updateAsset(id: number, data: UpdateAssetData, userId: number): Promise<Asset> {
        const asset = await Asset.findOne({ where: { assetId: id, userId } });
        if (!asset) {
            throw new NotFound(`Aset dengan ID: ${id} tidak ditemukan.`);
        }
        asset.assetType = data.assetType ?? asset.assetType;
        asset.assetCategory = data.assetCategory ?? asset.assetCategory;
        asset.amount = data.amount ?? asset.amount;
        asset.description = data.description ?? asset.description;
        if (data.createdAt) asset.setDataValue('createdAt', data.createdAt);

        await asset.save();
        return asset;
    }

    async deleteAsset(id: number, userId: number): Promise<number> {
        const result = await Asset.destroy({ where: { assetId: id, userId } });
        if (result === 0) {
            throw new NotFound(`Aset dengan ID: ${id} tidak ditemukan.`);
        }
        return result;
    }


}

export default new AssetService;