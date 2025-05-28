// pages/TransactionPage.js
import React from "react";
import { Layout, Typography, Button } from "antd";
import TransactionTable from "../components/TransactionTable";
// import Summary from "../components/Summary";

const { Header, Content } = Layout;
const { Title } = Typography;

function TransactionPage({ transactions }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Title style={{ color: "white", margin: 10 }} level={3}>
          Daftar Transaksi
        </Title>
      </Header>
      <Content style={{ padding: "20px 10px" }}>
        <Button onClick={() => window.history.back()} style={{ display: "block", marginBottom: 5, marginLeft: "auto" }}>Kembali</Button>
        {/* <Summary transactions={transactions} /> */}
        <TransactionTable transactions={transactions} />
      </Content>
    </Layout>
  );
}

export default TransactionPage;
