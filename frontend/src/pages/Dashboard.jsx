import { useEffect, useState, useContext } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterSort from "../components/FilterSort";
import TotalDisplay from "../components/TotalDisplay";
import { fetchExpenses } from "../api/expenseApi";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const params = {};
      if (category) params.category = category;
      if (sort) params.sort = sort;

      const res = await fetchExpenses(params);
      setExpenses(res.data);
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [category, sort]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "50px 20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "35px",
            borderBottom: "1px solid #eee",
            paddingBottom: "20px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              Expense Tracker
            </h1>
            <p
              style={{
                marginTop: "5px",
                color: "#888",
                fontSize: "14px",
              }}
            >
              Welcome back, {user?.name}
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.3s",
            }}
          >
            Logout
          </button>
        </div>

        {/* Expense Form Section */}
        <div
          style={{
            marginBottom: "30px",
            padding: "25px",
            borderRadius: "15px",
            background: "#f9fafc",
            boxShadow: "inset 0 0 0 1px #eee",
          }}
        >
          <ExpenseForm onExpenseAdded={loadExpenses} />
        </div>

        {/* Filter + Sort Section */}
        <div
          style={{
            marginBottom: "25px",
            padding: "20px",
            borderRadius: "15px",
            background: "#f9fafc",
            boxShadow: "inset 0 0 0 1px #eee",
          }}
        >
          <FilterSort
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />
        </div>

        {/* Loading */}
        {loading && (
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Loading expenses...
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            style={{
              color: "#e74c3c",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}

        {/* Expense List */}
        {!loading && !error && (
          <>
            <div
              style={{
                padding: "20px",
                borderRadius: "15px",
                background: "#ffffff",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              }}
            >
              <ExpenseList expenses={expenses} />
            </div>

            <div
              style={{
                marginTop: "20px",
                textAlign: "right",
                fontSize: "18px",
                fontWeight: "600",
                color: "#333",
              }}
            >
              <TotalDisplay expenses={expenses} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
