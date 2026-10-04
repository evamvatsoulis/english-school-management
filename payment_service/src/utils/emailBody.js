const logoUrl = "https://scontent.fnic2-2.fna.fbcdn.net/v/t39.30808-6/453414973_1512513482718137_4989684455941183468_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=gXvrNm7JS6MQ7kNvwEQ90sG&_nc_oc=Adq6NqmHA9Eo8YPdA_457lVibEwvMdXoM89dPYhDIL-06CpTYTHks7aYilu12r7V9H4&_nc_zt=23&_nc_ht=scontent.fnic2-2.fna&_nc_gid=JZxsKNW2g0YI_-l95bERdw&_nc_ss=7c2a8&oh=00_AQM_Cwk1qR0Uu7TaB7GDzKBl5lQQaOWU6aq94F0dfWEfBw&oe=6AC5F78D";

const emailBody = (paymentMonth, paymentYear, paymentDate) => {
    return `
        <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px;">
            <img src=${logoUrl} alt="logo" width="100" height="100">
            <h2>Payment Confirmation</h2>
            <p>Your payment for ${paymentMonth}/${paymentYear} has been successfully completed</p>
            <p>Payment Date: ${paymentDate}</p> <br>

            <p>&copy; 2026 Stefania Kyriakou Vamvatsouli</p>
            <p>English Private Institute</p>
            <p>All rights reserved.</p>
        </div>
    `;
};

module.exports = { emailBody };