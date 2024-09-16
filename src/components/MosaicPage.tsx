import React, { useState, useEffect, useCallback } from "react";
import { Mosaic, MosaicNode, MosaicBranch, getLeaves } from "react-mosaic-component";
import axios from "axios";

import { CompanyData } from "../models/company-data";
import CompanyWindow from "./CompanyWindow";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";


type ViewId = string;

const MosaicPage: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<ViewId> | null>(null);
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTickers, setSelectedTickers] = useState<Record<ViewId, string>>({});

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/data/companies-lookup.json");
        const fetchedCompanies = response.data;
        setCompanies(fetchedCompanies);

        if (fetchedCompanies.length >= 3) {
          const initialNode: MosaicNode<ViewId> = {
            direction: "row",
            first: fetchedCompanies[0]?.ticker || "a",
            second: {
              direction: "column",
              first: fetchedCompanies[1]?.ticker || "b",
              second: fetchedCompanies[2]?.ticker || "c",
            },
          };
          setCurrentNode(initialNode);
          setSelectedTickers({
            [fetchedCompanies[0]?.ticker || "a"]: fetchedCompanies[0]?.ticker || "a",
            [fetchedCompanies[1]?.ticker || "b"]: fetchedCompanies[1]?.ticker || "b",
            [fetchedCompanies[2]?.ticker || "c"]: fetchedCompanies[2]?.ticker || "c",
          });
        } else {
          console.error("Not enough companies to initialize the mosaic");
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      }
    };

    fetchCompanies();
  }, []);

  const createNode = useCallback((): ViewId => {
    let newId: ViewId;
    let idCounter = 1;

    do {
      newId = `new-${idCounter}`;
      idCounter += 1;
    } while (getLeaves(currentNode).includes(newId));

    return newId;
  }, [currentNode]);

  const handleChange = (newNode: MosaicNode<ViewId> | null) => {
    setCurrentNode(newNode || currentNode);
  };

  const handleTickerChange = (viewId: ViewId, event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTickers((prev) => ({
      ...prev,
      [viewId]: event.target.value,
    }));
  };

  const renderTile = (id: ViewId, path: MosaicBranch[]) => {
    return (
      <CompanyWindow
        id={id}
        path={path}
        createNode={createNode}
        company={companies.find(c => c.ticker === selectedTickers[id])}
        companies={companies}
        onTickerChange={(event) => handleTickerChange(id, event)}
      />
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Mosaic<ViewId>
      renderTile={renderTile}
      initialValue={currentNode}
      onChange={handleChange}
      blueprintNamespace="bp5"
    />
  );
};

export default MosaicPage;
