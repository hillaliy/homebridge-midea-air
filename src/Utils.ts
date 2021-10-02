// Utils – Utility functions
import crypto from "crypto";
import Constants from './Constants';

export default class Utils {
	static encode(data: number[]): number[] {
		const normalized = [];
		for (let b of data) {
			if (b >= 128) {
				b = b - 256;
			};
			normalized.push(b);
		};
		return normalized;
	};

	static decode(data: number[]): number[] {
		const normalized = [];
		for (let b of data) {
			if (b < 0) {
				b = b + 256;
			};
			normalized.push(b);
		};
		return normalized;
	};
	// Returns a timestamp in the format YYYYMMDDHHmmss
	static getStamp(): string {
		const date = new Date();
		return date
			.toISOString()
			.slice(0, 19)
			.replace(/-/g, "")
			.replace(/:/g, "")
			.replace(/T/g, "");
	};

	static formatResponse(arr: any[]) {
		let output: string[] = []
		for (var i = 0; i < arr.length; i++) {
			let intValue = parseInt(arr[i]);
			output.push((intValue).toString(2))
		};
		return output;
	};

	static getSign(path: string, form: any) {
		if (path != '' && form) {
			let postfix = "/v1" + path;
			postfix = postfix.split('?')[0]
			// Maybe this will help, should remove any query string parameters in the URL from the sign
			const ordered: any = {};
			Object.keys(form)
				.sort()
				.forEach(function (key: any) {
					ordered[key] = form[key];
				});
			const query = Object.keys(ordered)
				.map((key) => key + "=" + ordered[key])
				.join("&");
			return crypto
				.createHash("sha256")
				.update(postfix + query + Constants.AppKey)
				.digest("hex");
		} else {
			return false;
		};
	};

	static decryptAes(reply: string, dataKey: string) {
		if (reply && dataKey != '') {
			const decipher = crypto.createDecipheriv("aes-128-ecb", dataKey, "");
			const dec = decipher.update(reply, "hex", "utf8");
			return dec.split(",").map(Number);
		} else {
			return [];
		};
	};

	static decryptAesString(reply: string, dataKey: string) {
		if (reply && dataKey != '') {
			const decipher = crypto.createDecipheriv("aes-128-ecb", dataKey, "");
			const dec = decipher.update(reply, "hex", "utf8");
			return dec;
		} else {
			return '';
		};
	};

	static encryptAes(query: number[], dataKey: string) {
		if (query && dataKey != '') {
			const cipher = crypto.createCipheriv("aes-128-ecb", dataKey, "");
			let ciph = cipher.update(query.join(","), "utf8", "hex");
			ciph += cipher.final("hex");
			return ciph;
		} else {
			return false;
		};
	};

	static encryptAesString(query: string, dataKey: string) {
		if (dataKey != '') {
			const cipher = crypto.createCipheriv("aes-128-ecb", dataKey, "");
			let ciph = cipher.update(query, "utf8", "hex");
			ciph += cipher.final("hex");
			return ciph;
		} else {
			return false;
		};
	};

	static getSignPassword(loginId: string, password: string) {
		if (loginId != '' && password != '') {
			const pw = crypto
				.createHash("sha256")
				.update(password)
				.digest("hex");
			return crypto
				.createHash("sha256")
				.update(loginId + pw + Constants.AppKey)
				.digest("hex");
		} else {
			return '';
		};
	};

	static generateDataKey(accessToken: string) {
		if (accessToken != '') {
			const md5AppKey = crypto
				.createHash("md5")
				.update(Constants.AppKey).digest("hex");
			const decipher = crypto.createDecipheriv("aes-128-ecb", md5AppKey.slice(0, 16), "");
			const dec = decipher.update(accessToken, "hex", "utf8");
			return dec;
		};
		return '';
	};
};