import React from "react";
import { Dropdown } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import type { MenuProps } from "antd";

interface LanguageSelectorProps {
  className?: string;
  size?: "small" | "middle" | "large";
  style?: React.CSSProperties;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className="cursor-pointer",
  style,
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "en",
      label: (
        <span className="flex items-center gap-2">
          🇺🇸 {t("language.english")}
        </span>
      ),
      onClick: () => handleLanguageChange("en"),
    },
    {
      key: "ne",
      label: (
        <span className="flex items-center gap-2">
          🇳🇵 {t("language.nepali")}
        </span>
      ),
      onClick: () => handleLanguageChange("ne"),
    },
    {
      key: "es",
      label: (
        <span className="flex items-center gap-2">
          🇪🇸 {t("language.spanish")}
        </span>
      ),
      onClick: () => handleLanguageChange("es"),
    },
    {
      key: "zh",
      label: (
        <span className="flex items-center gap-2">
          🇨🇳 {t("language.chinese")}
        </span>
      ),
      onClick: () => handleLanguageChange("zh"),
    },
  ];

  const languageNames: Record<string, string> = {
    en: "English",
    ne: "नेपाली",
    es: "Español",
    zh: "中文",
  };

  return (
    <Dropdown
      menu={{ items: menuItems, selectedKeys: [i18n.language] }}
      placement="bottomRight"
      trigger={["hover"]}
    >
      <div className={className} style={style}>
        <span>{languageNames[i18n.language] || i18n.language}</span>
        <GlobalOutlined className="ml-2" />
      </div>
    </Dropdown>
  );
};

export default LanguageSelector;
