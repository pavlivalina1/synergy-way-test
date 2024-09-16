import React from "react";
import { HTMLSelect } from "@blueprintjs/core";
import {
  ReplaceButton,
  ExpandButton,
  SplitButton,
  RemoveButton,
} from "react-mosaic-component";
import { CompanyData } from "../models/company-data";

interface CustomToolbarProps {
  id: string;
  companies: CompanyData[];
  selectedTicker: string;
  onTickerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  id,
  companies,
  selectedTicker,
  onTickerChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <HTMLSelect
        value={selectedTicker}
        onChange={onTickerChange}
        className="w-48 sm:w-auto"
      >
        <option value="">Select a company...</option>
        {companies.map((company) => (
          <option key={company.ticker} value={company.ticker}>
            {company.name} ({company.ticker})
          </option>
        ))}
      </HTMLSelect>
      <div className="flex">
        <ReplaceButton />
        <ExpandButton />
        <SplitButton />
        <RemoveButton />
      </div>
    </div>
  );
};

export default CustomToolbar;
