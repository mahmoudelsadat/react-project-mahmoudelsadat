import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { currentUser } = useAuth();
  const { vaultItems } = useCart();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const toggleLanguage = () => {
    const currentLang = i18n.language || window.localStorage.i18nextLng || "en";
    const newLang = currentLang.startsWith("en") ? "ar" : "en";

    i18n.changeLanguage(newLang);

    document.dir = newLang === "ar" ? "rtl" : "ltr";

    if (newLang === "ar") {
      document.body.style.fontFamily = '"Cairo", "Tajawal", sans-serif';
    } else {
      document.body.style.fontFamily = '"Helvetica Neue", "Arial", sans-serif';
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "#0a0b00",
        borderBottom: "1px solid #333",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Box
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            bgcolor: "#D4AF37",
            px: 3,
            py: 1,
            display: "flex",
            alignItems: "center",
            boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#060700", fontWeight: 900, letterSpacing: "0.2em" }}
          >
            2M
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Button
            component={Link}
            to="/"
            sx={{ color: "#F5F5F5", border: "none" }}
          >
            {t("nav_sleep")}
          </Button>

          {currentUser ? (
            <>
              <Badge
                badgeContent={vaultItems?.length || 0}
                sx={{
                  "& .MuiBadge-badge": { bgcolor: "#D4AF37", color: "#060700" },
                }}
              >
                <Button
                  component={Link}
                  to="/checkout"
                  sx={{ color: "#D4AF37", border: "1px solid #D4AF37" }}
                >
                  {t("nav_checkout")}
                </Button>
              </Badge>
              <Button
                onClick={handleLogout}
                sx={{
                  color: "#888",
                  border: "none",
                  "&:hover": { color: "#ff4444" },
                }}
              >
                {t("nav_logout")}
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ color: "#D4AF37", border: "none" }}
              >
                {t("nav_login")}
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#060700",
                  bgcolor: "#D4AF37",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                {t("nav_register")}
              </Button>
            </>
          )}

          <Box sx={{ width: "1px", height: "24px", bgcolor: "#333", mx: 1 }} />

          <Button
            onClick={toggleLanguage}
            sx={{
              color: "#888",
              minWidth: "40px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              "&:hover": { color: "#fff", bgcolor: "transparent" },
            }}
          >
            {i18n.language?.startsWith("en") ? "عربي" : "EN"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
