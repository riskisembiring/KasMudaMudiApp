// pages/AddIncomePage.js
import React from "react";
import AddIncome from "../components/AddIncome";
import { useNavigate } from "react-router-dom";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

function AddIncomePage({ onAdd }) {
  const navigate = useNavigate();

  const handleShowTransactions = () => {
    navigate("/transactions");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title
          level={3}
          style={{
            color: "white",
            margin: 10,
            fontSize: "clamp(16px, 4vw, 32px)", // ukuran minimum 16px, maksimum 32px
            textAlign: "center",
          }}
        >
          Kas Muda-Mudi Gereja Sidang Rohul Kudus Indonesia
        </Title>
      </Header>
      <Content style={{ padding: "20px 10px" }}>
        <AddIncome onAdd={onAdd} onShowTransactions={handleShowTransactions} />
      </Content>
    </Layout>
  );
}

export default AddIncomePage;
