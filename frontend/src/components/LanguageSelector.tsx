import React from "react";
import { Select } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface LanguageSelectorProps {
  className?: string;
  size?: "small" | "middle" | "large";
  style?: React.CSSProperties;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  size = "middle",
  style,
}) => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      className={className}
      style={style}
      size={size}
      suffixIcon={<GlobalOutlined />}
      popupMatchSelectWidth={false}
      placement="bottomRight"
    >
      <Option value="en">
        <span className="flex items-center gap-2">
          🇺🇸 {t("language.english")}
        </span>
      </Option>
      <Option value="ne">
        <span className="flex items-center gap-2">
          🇳🇵 {t("language.nepali")}
        </span>
      </Option>
      <Option value="es">
        <span className="flex items-center gap-2">
          🇪🇸 {t("language.spanish")}
        </span>
      </Option>
      <Option value="zh">
        <span className="flex items-center gap-2">
          🇨🇳 {t("language.chinese")}
        </span>
      </Option>
    </Select>
  );
};

export default LanguageSelector;
