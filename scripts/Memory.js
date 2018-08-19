class Memory {
  constructor(size) {
    this.buffer = new ArrayBuffer(size);
    this.dataView = new DataView(this.buffer);
  }

  get size() {
    return this.buffer.byteLength;
  }

  setUint32(address, value) {
    this.dataView.setUint32(address, value, true);
  }

  getUint8(address) {
    return this.dataView.getUint8(address);
  }
}

export {
  Memory
}
