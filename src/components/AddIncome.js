import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
} from "antd";
import dayjs from "dayjs";

function AddIncome({ onAdd, onShowTransactions }) {
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = async (values) => {
    const payload = {
      type: "income",
      name: values.name,
      gereja: values.gereja,
      amount: values.amount,
      month: values.month,
    };

    try {
      const response = await fetch("https://kas-muda-mudi.vercel.app/api/income/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Sukses:", result.message);
        alert(result.message);
        onAdd(payload);
        form.resetFields();
      } else {
        alert(result.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      console.error("Gagal:", error);
      alert("Tidak dapat menghubungi server.");
    }
  };

  return (
    <Card title="Tambah Iuran Kas" style={{ marginBottom: 20 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          month: dayjs().format("MMMM-YYYY"),
        }}
      >
        <Form.Item
          name="name"
          label="Nama"
          rules={[{ required: true, message: "Masukkan nama" }]}
        >
          <Input placeholder="Nama penyetor" />
        </Form.Item>
        <Form.Item
          name="gereja"
          label="Gereja Cabang"
          rules={[{ required: true, message: "Pilih Gereja Cabang" }]}
        >
          <Select style={{ width: "100%" }} placeholder="Pilih Gereja Cabang">
            <Option value="sidomulyo">GSRI Sidomulyo</Option>
            <Option value="serdang">GSRI Serdang</Option>
            <Option value="pasar5">GSRI Pasar 5</Option>
            <Option value="Sibirik">GSRI Sibirik</Option>
            <Option value="Gelugur">GSRI Gelugur</Option>
            <Option value="Bekiung">GSRI Bekiung</Option>
            <Option value="Sukajulu">GSRI Sukajulu</Option>
            <Option value="Pebulan">GSRI Perbulan</Option>
            <Option value="Haunatas">GSRI Haunatas</Option>
            <Option value="Porsea">GSRI Porsea</Option>
            <Option value="Siantar">GSRI Siantar</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="amount"
          label="Jumlah (Rp)"
          rules={[{ required: true, message: "Masukkan jumlah" }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            parser={(value) => value.replace(/[^0-9]/g, "")}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            onKeyPress={(e) => {
              if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Form.Item name="month" label="Bulan">
          <Input style={{ width: "50%" }} disabled />
        </Form.Item>
        <Form.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="link" onClick={onShowTransactions}>
              Lihat Daftar Transaksi
            </Button>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AddIncome;
