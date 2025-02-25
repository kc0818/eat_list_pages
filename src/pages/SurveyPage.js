import { useState, useEffect } from "react";

const apiUrl = `https://script.google.com/macros/s/AKfycbxEyNHIAiwRvxPAlmCmLOwwrIQFZoglHEIqnyZJ1bgGFXwHFcmRD0PZWsv819oSljC2/exec`
window.googleDocCallback = function () { return true; };

const App = () => {
    const q1Options = ["北海道", "東北", "東京", "関東", "東海", "甲信越", "北陸", "関西", "中国", "四国", "九州", "海外"];
    const q3Options = ["オンライン受付あり", "オンライン予約あり", "両方あり", "なし"];
    const q4Options = ["毎回使用", "定期的に使用", "使用なし"];
    const q5Options = ["鼻・口の両方", "鼻からのみ", "口からのみ"];

    const [q1, setQ1] = useState(""); // Q1の選択状態
    const [q2Options, setQ2Options] = useState([]); // Q2の選択肢
    const [q2, setQ2] = useState(""); // Q2の選択状態
    const [q3, setQ3] = useState(""); // Q3の選択状態
    const [q4, setQ4] = useState(""); // Q4の選択状態
    const [q5, setQ5] = useState(""); // Q5の選択状態

    useEffect(() => {
        if (!q1) return; // Q1が未選択ならAPIリクエストしない

        const fetchData = async () => {
            try {
                console.log(q1)
                const response = await fetch(apiUrl + `?area=${encodeURIComponent(q1)}`);
                const data = await response.json();
                console.log(data)

                // "name" の値を選択肢としてセット
                const filteredNames = data.map((item) => item.name);

                setQ2Options(filteredNames);
                setQ2(""); // Q2の選択をリセット
            } catch (error) {
                console.error("API取得エラー:", error);
            }
        };

        fetchData();
    }, [q1]); // Q1が変更されるたびにAPIリクエスト

    // フォーム送信時の処理
    const handleSubmit = async (e) => {
        e.preventDefault(); // ページリロードを防ぐ

        // 送信する JSON データ
        const jsonData = JSON.stringify({
            "area": q1, 
            "name": q2, 
            "reception": q3, 
            "microscope": q4, 
            "abrasion": q5,
        });

        try {
            console.log(q3, q4, q5)
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: jsonData,
            });

            if (!response.ok) {
                throw new Error("送信に失敗しました");
            }
            
            alert("アンケートが送信されました！");

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h2>アンケート</h2>

            {/* Q1（静的選択肢） */}
            <label>
                Q1: 地域を選択してください
                <select value={q1} onChange={(e) => setQ1(e.target.value)}>
                    <option value="">選択してください</option>
                    {q1Options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label><br />

            {/* Q2（API連動） */}
            <label>
                Q2: 病院を選択してください
                <select value={q2} onChange={(e) => setQ2(e.target.value)}>
                    <option value="">選択してください</option>
                    {q2Options.length > 0 ? (
                        q2Options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))
                    ) : (
                        <option value="">データなし</option>
                    )}
                </select>
            </label><br />

            {/* Q3（静的選択肢） */}
            <label>
                Q3: オンライン受付・予約の有無について選択してください
                <select value={q3} onChange={(e) => setQ3(e.target.value)}>
                    <option value="">選択してください</option>
                    {q3Options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label><br />

            {/* Q4（静的選択肢） */}
            <label>
                Q4:マイクロスコープの使用の有無について選択してください
                <select value={q4} onChange={(e) => setQ4(e.target.value)}>
                    <option value="">選択してください</option>
                    {q4Options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label><br />

            {/* Q5（静的選択肢） */}
            <label>
                Q5: 擦過方法について選択してください
                <select value={q5} onChange={(e) => setQ5(e.target.value)}>
                    <option value="">選択してください</option>
                    {q5Options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </label><br />
            <button type="submit" onClick={handleSubmit}>送信</button>
        </div>
    );
};

export default App;
