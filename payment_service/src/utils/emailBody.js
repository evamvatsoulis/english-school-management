const emailBody = (paymentMonth, paymentYear, paymentDate) => {
    return `
    <h1>English Private Institute</h1>
    <p>The payment for ${paymentMonth}/${paymentYear} was successfully recorded. Date: ${paymentDate}</p>
    `;
};

module.exports = { emailBody };