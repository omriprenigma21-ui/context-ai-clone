"use client";

import { useState } from "react";
import { ExcelArtifact } from "./ExcelArtifact";
import { DocumentArtifact } from "./DocumentArtifact";
import { PresentationArtifact } from "./PresentationArtifact";
import { CodeArtifact } from "./CodeArtifact";
import { ImageArtifact } from "./ImageArtifact";
import { DataArtifact } from "./DataArtifact";
import { ArtifactViewer } from "./ArtifactViewer";

interface ArtifactRendererProps {
  artifact: {
    id: string;
    name: string;
    type: "spreadsheet" | "document" | "presentation" | "code" | "image" | "data";
    createdAt: string;
    size?: string;
    metadata?: {
      pages?: number;
      wordCount?: number;
      slideCount?: number;
      lines?: number;
      dimensions?: string;
      records?: number;
    };
  };
  size?: "small" | "large";
  onClick?: () => void;
}

export const ArtifactRenderer = ({ artifact, size = "large", onClick }: ArtifactRendererProps) => {
  const [showViewer, setShowViewer] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowViewer(true);
    }
  };

  const renderArtifactComponent = () => {
    const commonProps = {
      artifact,
      size,
      onClick: handleClick
    };

    switch (artifact.type) {
      case "spreadsheet":
        return <ExcelArtifact {...commonProps} />;
      case "document":
        return <DocumentArtifact {...commonProps} />;
      case "presentation":
        return <PresentationArtifact {...commonProps} />;
      case "code":
        return <CodeArtifact {...commonProps} />;
      case "image":
        return <ImageArtifact {...commonProps} />;
      case "data":
        return <DataArtifact {...commonProps} />;
      default:
        return <ExcelArtifact {...commonProps} />;
    }
  };

  return (
    <>
      {renderArtifactComponent()}

      {showViewer && (
        <ArtifactViewer
          artifact={artifact}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
};
