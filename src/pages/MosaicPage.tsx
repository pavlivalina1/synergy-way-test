import React, { useState, useEffect, useCallback } from "react";
import {
  Mosaic,
  MosaicNode,
  MosaicBranch,
  getLeaves,
} from "react-mosaic-component";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

import { CompanyData } from "../models/company-data";
import CompanyWindow from "../components/CompanyWindow";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

type ViewId = string;

const MosaicPage: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<MosaicNode<ViewId> | null>(
    null
  );
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTickers, setSelectedTickers] = useState<
    Record<ViewId, string>
  >({});

  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1025px)" });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/data/companies-lookup.json");
        const fetchedCompanies = response.data;
        setCompanies(fetchedCompanies);

        if (fetchedCompanies.length >= 3) {
          let initialNode: MosaicNode<ViewId>;

          if (isMobile) {
            initialNode = {
              direction: "column",
              first: fetchedCompanies[0]?.ticker || "a",
              second: {
                direction: "column",
                first: fetchedCompanies[1]?.ticker || "a",
                second: fetchedCompanies[2]?.ticker || "b",
              },
            };
          } else if (isTablet) {
            initialNode = {
              direction: "column",
              first: {
                direction: "row",
                first: fetchedCompanies[0]?.ticker || "a",
                second: fetchedCompanies[1]?.ticker || "b",
              },
              second: fetchedCompanies[2]?.ticker || "c",
            };
          } else {
            initialNode = {
              direction: "row",
              first: fetchedCompanies[0]?.ticker || "a",
              second: {
                direction: "column",
                first: fetchedCompanies[1]?.ticker || "b",
                second: fetchedCompanies[2]?.ticker || "c",
              },
            };
          }

          setCurrentNode(initialNode);
          setSelectedTickers({
            [fetchedCompanies[0]?.ticker || "a"]:
              fetchedCompanies[0]?.ticker || "a",
            [fetchedCompanies[1]?.ticker || "b"]:
              fetchedCompanies[1]?.ticker || "b",
            [fetchedCompanies[2]?.ticker || "c"]:
              fetchedCompanies[2]?.ticker || "c",
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
  }, [isMobile, isTablet, isDesktop]);

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

  const handleTickerChange = (
    viewId: ViewId,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
        company={companies.find((c) => c.ticker === selectedTickers[id])}
        companies={companies}
        onTickerChange={(event) => handleTickerChange(id, event)}
      />
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full h-screen">
      <Mosaic<ViewId>
        renderTile={renderTile}
        initialValue={currentNode}
        onChange={handleChange}
        blueprintNamespace="bp5"
      />
    </div>
  );
};

export default MosaicPage;
