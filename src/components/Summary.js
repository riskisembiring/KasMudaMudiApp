import React, { useEffect, useState } from 'react';
import { Card, Spin } from 'antd';

function Summary({ transactions = [] }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Nyalakan loading ketika data masih kosong atau berubah
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300); // kasih delay kecil untuk UX lebih smooth

    return () => clearTimeout(timeout);
  }, [transactions]);

  // Hitung total berdasarkan tipe transaksi
  const total = transactions.reduce((sum, t) => {
    const amount = Number(t.amount) || 0;
    return t.type === 'income' ? sum + amount : sum - amount;
  }, 0);

  return (
    <Spin spinning={isLoading}>
      <Card style={{ marginBottom: 20 }} title="Total Kas">
        <h2 style={{ color: total >= 0 ? 'green' : 'red' }}>
          Rp {total.toLocaleString('id-ID')}
        </h2>
      </Card>
    </Spin>
  );
}

export default Summary;
