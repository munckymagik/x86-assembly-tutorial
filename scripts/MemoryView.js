const pad = (number, width) => ("0000000" + number).slice(-(width || 8));
const fmtAddress = (address, width) => `0x${pad(address.toString(16), width)}`;

class MemoryView {
  constructor(x, y, memory) {
    this.x = x;
    this.y = y;
    this.num_bytes = memory.size;
    this.memory = memory;
    this.values = new Map();
    this.memory.onChange(this.onChangeHandler());
  }

  onChangeHandler() {
    return ((address, count) => {
      while (count-- > 0) {
        let elem = this.values.get(address);
        elem.attr({
          text: fmtAddress(this.memory.getUint8(address), 2)
        });
        ++address;
      }
    }).bind(this);
  }

  render(g) {
    const unit = 40;
    const cells_per_row = 16;
    const row_w = cells_per_row * unit;
    const row_h = unit;
    const row_space = row_h + unit * 2;

    this.renderMarker(g, this.x + unit * 4, this.y + row_h);

    for (let row = 0; row * cells_per_row < this.num_bytes; row++) {
      const row_x = this.x;
      const row_y = this.y + row * row_space;

      this.renderRowBox(g, row_x, row_y, row_w, row_h);

      for (let cell = 0; cell < cells_per_row; cell++) {
        const cell_x = row_x + cell * unit;
        const cell_y = row_y;

        this.renderCellDivider(g, cell, cell_x, cell_y, unit);

        const address = this.address(row, cell, cells_per_row);

        if (cell % 4 === 3) {
          this.renderAddress(g, cell_x, cell_y, unit, address);
        }

        const value = this.memory.getUint8(address);
        const valElem = this.renderValue(g, cell_x, cell_y, unit, value);
        this.values.set(address, valElem);
      }
    }
  }

  address(row, cell, cells_per_row) {
    const start_address = this.num_bytes - 1;
    const row_address = start_address - row * cells_per_row;
    const col_address = -cell;
    return row_address + col_address;
  }

  renderRowBox(g, row_x, row_y, row_w, row_h) {
    g.rect(row_x, row_y, row_w, row_h)
      .attr({ 'stroke-width': '2', fill: '#eee' })
  }

  renderCellDivider(g, cell, cell_x, cell_y, unit) {
    if (cell > 0) {
      let p = g.path(`M${cell_x},${cell_y} v${unit}`);
      if (cell % 4 !== 0) {
        p.attr({ "stroke-dasharray": "- " });
      } else {
        p.attr({ 'stroke-width': '2' });
      }
    }
  }

  renderAddress(g, cell_x, cell_y, unit, address) {
    g.text(cell_x + unit, cell_y - unit / 4, fmtAddress(address))
      .attr({ font: '11px "Helvetica Neue", Arial', fill: "#000", 'text-anchor': 'end' });
  }

  renderValue(g, cell_x, cell_y, unit, value) {
    return g.text(cell_x + unit / 2, cell_y + unit / 2, fmtAddress(value, 2))
      .attr({ font: '11px "Helvetica Neue", Arial', fill: "#000", 'text-anchor': 'middle' });
  }

  renderMarker(g, x, y) {
    g.path(`M${x},${y} l-10,10 l20,0 l-10,-10`).attr({ fill: 'black' });
    g.text(x, y + 20, "ebp")
      .attr({ font: '11px "Helvetica Neue", Arial', fill: "#000" });
  }
}

export {
  MemoryView
}
