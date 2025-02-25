import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [data, setData] = useState([]); // データを保持する state
  const API_URL = "https://script.google.com/macros/s/AKfycbxEyNHIAiwRvxPAlmCmLOwwrIQFZoglHEIqnyZJ1bgGFXwHFcmRD0PZWsv819oSljC2/exec"; // 取得するAPIのURL

  const navigate = useNavigate();

  const handleNavigate = () => {
    // アンケートページ へ遷移
    navigate('/surveyPage');
  };

  // APIからデータを取得する関数
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setData(result); // 取得したデータを state にセット
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };

  // 初回マウント時にデータを取得
  useEffect(() => {
    fetchData(); // 初回実行
  }, []); // 空の依存配列 → マウント時のみ実行

  return (
    <div>
      <h2>EAT療法実施機関リスト</h2>

      <p>
        <b>各医療機関の情報募集中！情報をお持ちの方は下のボタンを押して投稿ページよりお願いします！</b>
        <br></br>
        「オンライン受付・予約の有無」「マイクロスコープの使用有無」「擦過方法」について投稿お願いします
        <br></br>
        <button onClick={handleNavigate}>情報を投稿する</button>
      </p>

      <p>※※※掲載情報については一切責任を負いかねます。必ず受診前にご自身でお問い合わせ願います※※※</p>

      <table border="1" style={{ tableLayout: "fixed", width: "100%" }}>
        <thead>
          <tr>
            <th>地域</th>
            <th>医療機関名</th>
            <th>住所</th>
            <th>予約の必要性</th>
            <th>疾患の限定有無</th>
            <th>オンライン受付・予約</th>
            <th>マイクロスコープの使用</th>
            <th>擦過方法</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr>
                <td>{item.area}</td>
                <td>
                  <a href={item.site} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                </td>
                <td>{item.address}</td>
                <td>{item.reserve_limitation}</td>
                <td style={{ whiteSpace: "normal", wordWrap: "break-word" }}>{item.disease_limitation}</td>
                <td>{item.reception}</td>
                <td>{item.microscope}</td>
                <td>{item.abrasion}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">データがありません</td>
            </tr>
          )}
        </tbody>
      </table>
      <footer>
        Copyright &copy; 2025 kc0818
      </footer>
    </div>
  );
};

export default DataTable;
