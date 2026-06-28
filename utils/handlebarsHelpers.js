module.exports = {
    eq: function (v1, v2) {
        return v1 === v2;
    },
    formatCurrency: function(value) {
        if (!value) return '$0.00';
        return '$' + parseFloat(value).toFixed(2);
    },
    translate: function(key, options) {
        if (options && options.data && options.data.root && options.data.root.t) {
            return options.data.root.t(key);
        }
        return key;
    },
    t: function(key, options) {
        if (options && options.data && options.data.root && options.data.root.t) {
            return options.data.root.t(key);
        }
        return key;
    },
    renderStars: function(rating) {
        rating = parseFloat(rating) || 0;
        let html = '<div class="product-stars">';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                html += '<i class="fa-solid fa-star" style="color: #fbbf24;"></i>';
            } else if (rating >= i - 0.5) {
                html += '<i class="fa-solid fa-star-half-stroke" style="color: #fbbf24;"></i>';
            } else {
                html += '<i class="fa-regular fa-star" style="color: #d1d5db;"></i>';
            }
        }
        html += `<span class="rating-number">(${rating.toFixed(1)})</span></div>`;
        return html;
    }
};
