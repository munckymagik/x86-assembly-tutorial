const pad = number => ("0000000" + number).slice(-8);
const fmtAddress = address => `0x${pad(address.toString(16))}`;

class MemoryView {
  constructor(x, y, num_bytes) {
    this.x = x;
    this.y = y;
    this.num_bytes = num_bytes;
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

        if (cell % 4 === 3) {
          const address = this.address(row, cell, cells_per_row);
          this.renderAddress(g, cell_x, cell_y, unit, address);
        }
      }
    }
  }

  address(row, cell, cells_per_row) {
    const start_address = 0xffff0000 + this.num_bytes - 1;
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

  renderMarker(g, x, y) {
    g.path(`M${x},${y} l-10,10 l20,0 l-10,-10`).attr({ fill: 'black' });
    g.text(x, y + 20, "ebp")
      .attr({ font: '11px "Helvetica Neue", Arial', fill: "#000" });
  }
}

export {
  MemoryView
}