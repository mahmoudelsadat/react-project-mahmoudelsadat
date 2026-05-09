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
    document.body.style.fontFamily = newLang === "ar" ? '"Cairo", sans-serif' : '"Montserrat", sans-serif';
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'rgba(8, 12, 22, 0.6)', backdropFilter: 'blur(15px)', borderBottom: '1px solid rgba(139, 164, 212, 0.05)', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Box component={Link} to="/" sx={{ textDecoration: "none", px: 2, py: 1, display: "flex", alignItems: "center" }}>
          <Typography variant="h4" sx={{ color: "#E2E8F0", fontWeight: 300, letterSpacing: "0.2em", textShadow: '0 0 15px rgba(167, 199, 231, 0.4)' }}>
            2M
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Button component={Link} to="/" sx={{ color: "#8BA4D4", border: "none", fontWeight: 400, '&:hover': { color: '#fff', boxShadow: 'none', bgcolor: 'transparent' } }}>
            {t("nav_sleep")}
          </Button>

          {currentUser ? (
            <>
              <Button component={Link} to="/dashboard" sx={{ color: "#8BA4D4", border: "none", fontWeight: 400, '&:hover': { color: '#fff', boxShadow: 'none', bgcolor: 'transparent' } }}>
                SANCTUARY
              </Button>
              <Badge badgeContent={vaultItems?.length || 0} sx={{ "& .MuiBadge-badge": { bgcolor: "rgba(167, 199, 231, 0.2)", color: "#A7C7E7", border: '1px solid #A7C7E7' } }}>
                <Button component={Link} to="/checkout" sx={{ color: "#A7C7E7", borderColor: "rgba(167, 199, 231, 0.3)" }}>
                  {t("nav_checkout")}
                </Button>
              </Badge>
              <Button onClick={handleLogout} sx={{ color: "#4A5568", border: "none", fontWeight: 400, "&:hover": { color: "#A7C7E7", boxShadow: 'none', bgcolor: 'transparent' } }}>
                {t("nav_logout")}
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: "#8BA4D4", border: "none", fontWeight: 400, '&:hover': { color: '#fff', boxShadow: 'none', bgcolor: 'transparent' } }}>
                {t("nav_login")}
              </Button>
              <Button component={Link} to="/register" sx={{ color: "#080C16", bgcolor: "#A7C7E7", "&:hover": { bgcolor: "#fff" } }}>
                {t("nav_register")}
              </Button>
            </>
          )}

          <Box sx={{ width: "1px", height: "16px", bgcolor: "rgba(139, 164, 212, 0.2)", mx: 1 }} />
          
          <Button onClick={toggleLanguage} sx={{ color: "#4A5568", minWidth: "40px", fontWeight: 400, letterSpacing: "0.1em", border: 'none', "&:hover": { color: "#E2E8F0", bgcolor: "transparent", boxShadow: 'none' } }}>
            {i18n.language?.startsWith("en") ? "عربي" : "EN"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;