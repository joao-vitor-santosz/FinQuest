type FormatOptions = {
	locale?: string;
	currency?: string;
	minimumFractionDigits?: number;
	maximumFractionDigits?: number;
	currencyDisplay?: 'symbol' | 'code' | 'name';
};

export function formatCurrency(value: number | string, options: FormatOptions = {}): string {
	const locale = options.locale ?? 'pt-BR';
	const currency = options.currency ?? 'BRL';

	let num: number;
	if (typeof value === 'string') {
		// Allow input like "1234.56", "1234,56" or "R$ 1.234,56"
		const cleaned = value.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(/,/g, '.');
		num = Number(cleaned);
	} else {
		num = value;
	}

	if (Number.isNaN(num)) return '';

	const formatter = new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: options.minimumFractionDigits ?? 2,
		maximumFractionDigits: options.maximumFractionDigits ?? 2,
		currencyDisplay: options.currencyDisplay ?? 'symbol',
	});

	return formatter.format(num);
}

export default formatCurrency;