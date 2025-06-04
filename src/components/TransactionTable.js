import React, { useEffect, useState } from "react";
import { Table, Card, Button, Popconfirm, Input, Spin } from "antd";
import { utils, write } from "xlsx";
import { saveAs } from "file-saver";
import Summary from "./Summary";
import "../pages/TransactionPage.css";

const { Search } = Input;

function KasPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://kas-muda-mudi.vercel.app/api/income")
      .then((res) => res.json())
      .then((result) => {
        const withType = result.map((item) => ({ ...item, type: "income" }));
        setData(withType);
        setFilteredData(withType);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

const handleDelete = (id) => {
  fetch(`https://kas-muda-mudi.vercel.app/api/income/?id=${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);

      // Filter data lokal, buang yang id-nya sama
      const updated = data.filter((item) => item.id !== id);
      setData(updated);
      setFilteredData(updated);
      setSelectedRowKeys([]);
    })
    .catch((err) => {
      alert("Gagal menghapus data");
      console.error(err);
    });
};

  // Fungsi export Excel
  const exportToExcel = () => {
    // Buat data untuk Excel, pilih kolom yg ingin ditampilkan & format jumlah agar angka
    const dataForExcel = filteredData.map(({ id, name, gereja, amount, month }) => ({
      Nama: name,
      "Gereja Cabang": gereja,
      Jumlah: Number(amount),
      Bulan: month,
    }));

    const worksheet = utils.json_to_sheet(dataForExcel);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Transaksi");

    const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, "daftar_transaksi.xlsx");
  };

  const columns = [
    { title: "Nama", dataIndex: "name", key: "name", sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: "Gereja Cabang", dataIndex: "gereja", key: "gereja", sorter: (a, b) => a.gereja.localeCompare(b.gereja) },
    {
      title: "Jumlah",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount) => `Rp ${Number(amount).toLocaleString("id-ID")}`,
    },
    { title: "Bulan", dataIndex: "month", key: "month", sorter: (a, b) => a.month.localeCompare(b.month) },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Konfirmasi Hapus"
          description="Apakah Anda yakin ingin menghapus data ini?"
          okText="Ya"
          cancelText="Tidak"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger>Hapus</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Summary transactions={data} />
      <Card
      title={
        <div className="header-container">
          <div className="header-row">
            <span className="judul-transaksi">Daftar Transaksi</span>
            <Search
              placeholder="Cari nama..."
              allowClear
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-box"
            />
            <Button type="primary" onClick={exportToExcel} className="export-btn">
              Export to Excel
            </Button>
          </div>
        </div>
      }
        className="transaksi-card"
      >
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={filteredData}
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            onRow={(record) => ({
              onClick: () => {
                setSelectedRowKeys([record.id]);
              },
              style: selectedRowKeys.includes(record.id)
                ? { backgroundColor: "#b3d9ff" }
                : {},
            })}
          />
        </Spin>
      </Card>

      {/* Gaya responsif */}
      <style>{`
          .header-container {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .judul-transaksi {
            font-size: 20px;
            font-weight: 500;
          }

          @media (max-width: 576px) {
            .transaksi-card,
            .transaksi-card * {
              font-size: 12px !important;
            }

            .judul-transaksi {
              font-size: 15px !important;
              margin-top: 10px !important;
            }
          }
        `}</style>
    </div>
  );
}

export default KasPage;
