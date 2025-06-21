export enum ConversionRate {
    MYR = <number>1,
    IDR = <number>3451.55,
    USD = <number>0.21,
}

class MoneyConverter {
    public convertTo(currency: string, amount: number) {
        return parseFloat((parseFloat(ConversionRate[currency as any]) * amount).toFixed(3));
    }

    public addConvertedAmount(instances: any) {
        const instancesArray = Array.isArray(instances) ? instances : [instances].filter(Boolean);
        for (const instance of instancesArray) {
            if (instance.user && instance.user.currency) {
                const convertedValue = this.convertTo(instance.user.currency, instance.getDataValue('amount'));
                instance.dataValues.convertedAmount = convertedValue;
            }
            delete instance.dataValues.user;
        }
    }
}

export default new MoneyConverter;