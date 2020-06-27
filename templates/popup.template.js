const getPopup = (projectName) => {
    const popup_b64 = "PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPHRpdGxlPkVYVEVOU0lPTjwvdGl0bGU+CiAgICAgICAgPHNjcmlwdCBzcmM9ImpzL3BvcHVwLmpzIj48L3NjcmlwdD4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIDxoMT5FWFRFTlNJT048L2gxPgogICAgPC9ib2R5Pgo8L2h0bWw+";
    return Buffer.from(popup_b64,'base64').toString().replace(/EXTENSION/g,projectName);
}

exports.getPopup = getPopup;
