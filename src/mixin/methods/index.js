
export default {
	sDebounce(fn, delay = 1000) {
		let timer = null;
		return function() {
			timer = setTimeout(() => {
				fn.apply(this, arguments)
			}, delay)
		}
	},
	deepCopy(obj) {
		let clone = {};
		if (obj == null || Array.prototype.toString.call(obj).slice(8,-1) === 'Date' || typeof obj !== "object") {
			return obj;
		}
		if (Array.isArray(obj)) {
			clone = [];
			obj.forEach((val, index) => {
				clone[index] = this.deepCopy(val);
			});
			return clone;
		}
		for(let i in obj) {
			if (obj[i] === null) {
				clone[i] = obj[i];
			}else if (Array.isArray(obj[i])) {
				clone[i] = [];
				obj[i].forEach((val, index) => {
					clone[i][index] = this.deepCopy(val);
				});
			}else if (typeof obj[i] === "object") {
				clone[i] = this.deepCopy(obj[i]);
			}else {
				clone[i] = obj[i]
			}
		}
		return clone;
	}
}
