import React from "react";
import { CompanyData } from "../models/company-data";

interface CompanyProps {
  company: CompanyData;
}

const Company: React.FC<CompanyProps> = ({ company }) => {
  return (
    <div className="p-5 max-h-full overflow-auto">
      <p>
        <strong>Ticker:</strong> {company.ticker}
      </p>
      <p>
        <strong>Name:</strong> {company.name}
      </p>
      <p>
        <strong>Legal name:</strong> {company.legal_name}
      </p>
      <p>
        <strong>Stock exchange:</strong> {company.stock_exchange}
      </p>
      <p>
        <strong>Short description:</strong> {company.short_description}
      </p>
      <p>
        <strong>Long description:</strong> {company.long_description}
      </p>
      <p>
        <strong>Web:</strong>{" "}
        <a href={company.company_url} target="_blank" rel="noopener noreferrer">
          {company.company_url}
        </a>
      </p>
      <p>
        <strong>Business address:</strong> {company.business_address}
      </p>
      <p>
        <strong>Business phone:</strong> {company.business_phone_no}
      </p>
      <p>
        <strong>Entity legal form:</strong> {company.entity_legal_form}
      </p>
      <p>
        <strong>Latest filing date:</strong> {company.latest_filing_date}
      </p>
      <p>
        <strong>Inc country:</strong> {company.inc_country}
      </p>
      <p>
        <strong>Employees:</strong> {company.employees}
      </p>
      <p>
        <strong>Sector:</strong> {company.sector}
      </p>
      <p>
        <strong>Industry category:</strong> {company.industry_category}
      </p>
      <p>
        <strong>Industry group:</strong> {company.industry_group}
      </p>
      <p>
        <strong>Thea enabled true legacy sector:</strong> {company.thea_enabled}
      </p>
      <p>
        <strong>Legacy industry category:</strong>{" "}
        {company.legacy_industry_category}
      </p>
      <p>
        <strong>Legacy industry group:</strong> {company.legacy_industry_group}
      </p>
    </div>
  );
};

export default Company;
