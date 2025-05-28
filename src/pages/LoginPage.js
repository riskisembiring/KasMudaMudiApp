import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";

const { Title } = Typography;

function LoginPage({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    const endpoint = isRegister
      ? "https://kas-muda-mudi.vercel.app/api/auth/register"
      : "https://kas-muda-mudi.vercel.app/api/auth/login";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.success) {
          alert(result.message);
          if (!isRegister) {
            onLoginSuccess();
          } else {
            setIsRegister(false);
          }
        } else {
          alert(result.message || "Terjadi kesalahan.");
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Tidak dapat menghubungi server.");
        console.error(err);
      });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        background: "#f0f2f5",
      }}
    >
      <Card style={{ maxWidth: 400, width: "100%" }}>
        <Title
          level={3}
          style={{
            textAlign: "center",
            fontSize: "clamp(20px, 5vw, 28px)",
          }}
        >
          {isRegister ? "Daftar Akun Baru" : "Login Kas Muda-Mudi"}
        </Title>

        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Masukkan username!" }]}
          >
            <Input placeholder="Masukkan username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Masukkan password!" }]}
          >
            <Input.Password placeholder="Masukkan password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {isRegister ? "Daftar" : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="link"
          block
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Sudah punya akun? Login di sini"
            : "Belum punya akun? Daftar di sini"}
        </Button>
      </Card>
    </div>
  );
}

export default LoginPage;
