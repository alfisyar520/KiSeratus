import React, { useEffect, useState } from "react";
import SortableTree, {
  addNodeUnderParent,
  removeNodeAtPath,
  changeNodeAtPath,
} from "@nosferatu500/react-sortable-tree";
import "@nosferatu500/react-sortable-tree/style.css";

import Search from "../../components/SearchNode";

const SilsilahKeluarga = () => {
  const [treeData, setTreeData] = useState(
    JSON.parse(localStorage.getItem("tree_data")) ?? [
      { title: "name", name: "Name" },
    ]
  );
  const [addAsFirstChild, setAddAsFirstChild] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFoundCount, setSearchFoundCount] = useState(null);
  const [searchFocusIndex, setSearchFocusIndex] = useState(0);

  const getNodeKey = ({ treeIndex }) => treeIndex;

  useEffect(() => {
    localStorage.setItem("tree_data", JSON.stringify(treeData));
  }, [treeData]);

  const selectPrevMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null
        ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
        : searchFoundCount - 1
    );
  };

  const selectNextMatch = () => {
    setSearchFocusIndex(
      searchFocusIndex !== null ? (searchFocusIndex + 1) % searchFoundCount : 0
    );
  };

  const handleAddParent = () => {
    const newTree = addNodeUnderParent({
      treeData,
      parentKey: null,
      expandParent: true,
      getNodeKey,
      newNode: {
        title: "New",
        name: "New",
      },
    });

    setTreeData(newTree.treeData);
  };

  const handleAddChild = (node, path) => {
    const newTree = addNodeUnderParent({
      treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey,
      newNode: {
        title: "Child",
      },
      addAsFirstChild,
    });

    setTreeData(newTree.treeData);
  };

  const handleRemoveNode = (node, path) => {
    const newTree = removeNodeAtPath({
      treeData,
      path,
      getNodeKey,
    });

    setTreeData(newTree);
  };

  return (
    <div style={{ padding: "0 15px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Silsilah Keluarga</h2>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
          <Search
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabledNextBtn={!searchFoundCount}
            disabledPrevBtn={!searchFoundCount}
            selectPrevMatch={selectPrevMatch}
            selectNextMatch={selectNextMatch}
          />
          <div
            style={{
              borderRight: "1px solid #c8eafa",
              margin: "0 10px",
              height: "30px",
            }}
          ></div>
          <button className="btn-add-node" onClick={handleAddParent}>
            Add Parent
          </button>
        </div>
      </div>
      <div style={{ height: "100vh" }}>
        <SortableTree
          treeData={treeData}
          onChange={(treeData) => setTreeData(treeData)}
          searchQuery={search}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={(matches) => {
            setSearchFoundCount(matches.length);
            setSearchFocusIndex(
              matches.length > 0 ? searchFocusIndex % matches.length : 0
            );
          }}
          generateNodeProps={({ node, path }) => ({
            title: (
              <input
                style={{ fontSize: "1rem" }}
                value={node.name}
                onChange={(event) => {
                  const name = event.target.value;
                  const newTree = changeNodeAtPath({
                    treeData,
                    path,
                    getNodeKey,
                    newNode: { ...node, name, title: name },
                  });

                  setTreeData(newTree);
                }}
              />
            ),
            buttons: [
              <button
                className="button btn-add"
                onClick={() => handleAddChild(node, path)}
              >
                Add Child
              </button>,
              <button
                className="btn-delete"
                onClick={() => handleRemoveNode(node, path)}
              >
                Remove
              </button>,
            ],
          })}
        />
      </div>
    </div>
  );
};

export default SilsilahKeluarga;
