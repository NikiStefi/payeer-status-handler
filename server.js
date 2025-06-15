const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// ВСТАВЬ СЮДА СВОИ ДАННЫЕ:
const MERCHANT_ID = "2233561537"; 
const SECRET_KEY = "123"; 

app.post('/payeer_status', (req, res) => {
    const {
        m_operation_id,
        m_operation_ps,
        m_operation_date,
        m_operation_pay_date,
        m_shop,
        m_orderid,
        m_amount,
        m_curr,
        m_desc,
        m_status,
        m_sign
    } = req.body;

    const sign_string = [
        m_operation_id,
        m_operation_ps,
        m_operation_date,
        m_operation_pay_date,
        m_shop,
        m_orderid,
        m_amount,
        m_curr,
        m_desc,
        m_status,
        SECRET_KEY
    ].join(':');

    const hash = crypto.createHash('sha256').update(sign_string).digest('hex').toUpperCase();

    if (m_sign === hash && m_status === 'success') {
        console.log('Платеж успешно подтвержден!');
        // здесь можешь обрабатывать успешный платеж
        res.send(m_orderid + '|success');
    } else {
        console.log('Ошибка проверки платежа!');
        res.send(m_orderid + '|error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
