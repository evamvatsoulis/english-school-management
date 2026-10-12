const emailBody = (paymentMonth, paymentYear, paymentDate, logo) => {
    return `
        <div style="text-align: center; background-color: #ffffff; border-radius: 8px;">
            <div style="padding: 20px;">
                <img src="${logo}" alt="logo" width="100" height="100">
                <h2>Payment Confirmation</h2>
                <p>Your payment for ${paymentMonth}/${paymentYear} has been successfully completed</p>
                <p>Payment Date: ${paymentDate}</p> <br>

                <p>&copy; 2026 Stefania Kyriakou Vamvatsouli</p>
                <p>English Private Institute</p>
                <p>All rights reserved.</p>
            </div>
        </div>
    `;
};

module.exports = { emailBody };