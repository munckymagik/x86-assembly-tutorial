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
    this.notify(address, 4);
  }

  getUint8(address) {
    return this.dataView.getUint8(address);
  }

  onChange(handler) {
    this.onChangedHandler = handler;
  }

  notify(address, count) {
    if (!this.onChangedHandler) { return; }
    this.onChangedHandler(address, count);
  }
}

export {
  Memory
}
