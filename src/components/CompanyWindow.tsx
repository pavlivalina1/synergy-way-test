import React from "react";
import { MosaicWindow, MosaicBranch } from "react-mosaic-component";
import Company from "./Company";
import CustomToolbar from "./CustomToolbar";
import { CompanyData } from "../models/company-data";

interface CompanyWindowProps {
  id: string;
  path: MosaicBranch[];
  createNode: () => string;
  company?: CompanyData;
  companies: CompanyData[];
  onTickerChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CompanyWindow: React.FC<CompanyWindowProps> = ({
  id,
  path,
  createNode,
  company,
  companies,
  onTickerChange,
}) => {
  return (
    <MosaicWindow
      title="Company Info"
      path={path}
      createNode={createNode}
      renderToolbar={() => (
        <div className="w-full">
          <CustomToolbar
            id={id}
            companies={companies}
            selectedTicker={company?.ticker || ""}
            onTickerChange={onTickerChange}
          />
        </div>
      )}
    >
      {company ? (
        <Company company={company} />
      ) : (
        <div className="p-5 overflow-auto">
          <h2>Select a company</h2>
        </div>
      )}
    </MosaicWindow>
  );
};

export default CompanyWindow;
