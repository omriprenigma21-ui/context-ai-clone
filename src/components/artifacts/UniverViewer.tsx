"use client";

import { useEffect, useRef, useState } from 'react';
import {
  LocaleType,
  Univer,
  UniverInstanceType
} from '@univerjs/core';
import {
  UniverDocsPlugin
} from '@univerjs/docs';
import {
  UniverDocsUIPlugin
} from '@univerjs/docs-ui';
import {
  UniverFormulaEnginePlugin
} from '@univerjs/engine-formula';
import {
  UniverRenderEnginePlugin
} from '@univerjs/engine-render';
import {
  UniverSheetsPlugin
} from '@univerjs/sheets';
import {
  UniverSheetsUIPlugin
} from '@univerjs/sheets-ui';
import {
  UniverSheetsFormulaPlugin
} from '@univerjs/sheets-formula';
import {
  UniverSheetsFormulaUIPlugin
} from '@univerjs/sheets-formula-ui';
import {
  UniverSheetsNumfmtPlugin
} from '@univerjs/sheets-numfmt';
import {
  UniverSheetsNumfmtUIPlugin
} from '@univerjs/sheets-numfmt-ui';
import {
  UniverUIPlugin
} from '@univerjs/ui';

// Import Univer CSS - Essential for proper rendering
import '@univerjs/design/lib/index.css';
import '@univerjs/ui/lib/index.css';
import '@univerjs/docs-ui/lib/index.css';
import '@univerjs/sheets-ui/lib/index.css';
import '@univerjs/sheets-formula-ui/lib/index.css';
import '@univerjs/sheets-numfmt-ui/lib/index.css';

interface UniverViewerProps {
  artifactType: 'spreadsheet' | 'document' | 'presentation';
  containerId: string;
  data?: unknown;
  onReady?: () => void;
}

export const UniverViewer = ({
  artifactType,
  containerId,
  data,
  onReady
}: UniverViewerProps) => {
  const univerRef = useRef<Univer | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeUniver();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (univerRef.current) {
        try {
          univerRef.current.dispose();
        } catch (e) {
          console.warn('Error disposing Univer:', e);
        }
        univerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeUniver = async () => {
    try {
      console.log('🚀 Starting Univer initialization for:', artifactType);

      // Ensure the container element exists
      const containerElement = document.getElementById(containerId);
      if (!containerElement) {
        console.error(`❌ Container element with ID ${containerId} not found`);
        setError(`Container not found: ${containerId}`);
        return;
      }

      console.log('✅ Container found:', containerElement);
      console.log('📏 Container dimensions:', {
        width: containerElement.offsetWidth,
        height: containerElement.offsetHeight,
        clientWidth: containerElement.clientWidth,
        clientHeight: containerElement.clientHeight
      });

      // Clear any existing content
      containerElement.innerHTML = '';

      // Create Univer instance
      console.log('🏗️ Creating Univer instance...');
      const univer = new Univer({
        locale: LocaleType.EN_US,
        locales: {
          [LocaleType.EN_US]: {}, // We can add specific locales later if needed
        },
      });

      console.log('✅ Univer instance created');

      // Register core plugins - ALL document types need these
      console.log('🔌 Registering core plugins...');
      univer.registerPlugin(UniverRenderEnginePlugin);
      univer.registerPlugin(UniverFormulaEnginePlugin);

      // Register docs plugins first - they provide core editing services that sheets need
      univer.registerPlugin(UniverDocsPlugin);
      univer.registerPlugin(UniverDocsUIPlugin);

      univer.registerPlugin(UniverUIPlugin, {
        container: containerId,
      });
      console.log('✅ Core plugins registered');

      if (artifactType === 'spreadsheet') {
        console.log('📊 Setting up spreadsheet plugins...');
        // Register spreadsheet plugins
        univer.registerPlugin(UniverSheetsPlugin);
        univer.registerPlugin(UniverSheetsUIPlugin);
        univer.registerPlugin(UniverSheetsFormulaPlugin);
        univer.registerPlugin(UniverSheetsFormulaUIPlugin);
        univer.registerPlugin(UniverSheetsNumfmtPlugin);
        univer.registerPlugin(UniverSheetsNumfmtUIPlugin);
        console.log('✅ Spreadsheet plugins registered');

        // Create workbook with sample data or empty workbook
        let workbookData;

        // Type guard for data structure
        const isValidSpreadsheetData = (data: unknown): data is {
          name?: string;
          sheets: Array<{
            name?: string;
            cellData?: Record<string, unknown>;
            rowCount?: number;
            columnCount?: number;
          }>;
        } => {
          return data !== null &&
                 typeof data === 'object' &&
                 'sheets' in data &&
                 Array.isArray((data as { sheets: unknown }).sheets);
        };

        if (data && isValidSpreadsheetData(data)) {
          console.log('📋 Using provided data:', data);
          // Convert our data format to Univer format
          const sheet = data.sheets[0]; // Use first sheet
          workbookData = {
            id: `workbook-${Date.now()}`,
            name: data.name || "Financial Dashboard",
            sheetOrder: [sheet.name || "Sheet1"],
            sheets: {
              [sheet.name || "Sheet1"]: {
                id: sheet.name || "Sheet1",
                name: sheet.name || "Sheet1",
                cellData: sheet.cellData || {},
                rowCount: sheet.rowCount || 100,
                columnCount: sheet.columnCount || 20,
              }
            }
          };
        } else {
          console.log('📋 Using fallback data');
          // Fallback to default data
          workbookData = {
            id: `workbook-${Date.now()}`,
            name: "Financial Dashboard",
            sheetOrder: ["Sheet1"],
            sheets: {
              Sheet1: {
                id: "Sheet1",
                name: "Sheet1",
                cellData: {
                  0: {
                    0: { v: "Financial Performance Dashboard", s: { fontSize: 16, bold: true } },
                  },
                  1: {
                    0: { v: "Sample spreadsheet data will be displayed here" },
                  },
                  3: {
                    0: { v: "Total Revenue:" },
                    1: { v: "$4,937,200.33", s: { bold: true } },
                  },
                  4: {
                    0: { v: "Average Transaction:" },
                    1: { v: "$16,187.54", s: { bold: true } },
                  },
                  5: {
                    0: { v: "Data Sources:" },
                    1: { v: "Salesforce + QuickBooks", s: { bold: true } },
                  },
                },
                rowCount: 100,
                columnCount: 20,
              }
            }
          };
        }

        console.log('📊 Creating workbook with data:', workbookData);
        const workbook = univer.createUnit(UniverInstanceType.UNIVER_SHEET, workbookData as Record<string, unknown>);
        console.log('✅ Workbook created:', workbook);

      } else if (artifactType === 'document') {
        console.log('📄 Setting up document plugins...');
        // Document plugins already registered in core plugins above
        // Create document
        const docData = {
          id: `doc-${Date.now()}`,
          body: {
            dataStream: "Financial Analysis Report\nThis document contains comprehensive financial analysis...",
          },
        };

        console.log('📄 Creating document with data:', docData);
        const doc = univer.createUnit(UniverInstanceType.UNIVER_DOC, docData as Record<string, unknown>);
        console.log('✅ Document created:', doc);

      } else if (artifactType === 'presentation') {
        console.log('🎞️ Setting up presentation (fallback to document)...');
        // Presentation plugins not available, fallback to document
        // Document plugins already registered in core plugins above
        const docData = {
          id: `presentation-${Date.now()}`,
          body: {
            dataStream: "Revenue Presentation\nSlide 1: Executive Summary\nSlide 2: Financial Overview...",
          },
        };

        console.log('🎞️ Creating presentation document:', docData);
        const doc = univer.createUnit(UniverInstanceType.UNIVER_DOC, docData as Record<string, unknown>);
        console.log('✅ Presentation document created:', doc);
      }

      // Store the univer instance
      univerRef.current = univer;
      console.log('💾 Univer instance stored');

      // Wait a bit to ensure UI is rendered
      setTimeout(() => {
        const updatedContainer = document.getElementById(containerId);
        console.log('🔍 Final container check:', {
          exists: !!updatedContainer,
          hasChildren: updatedContainer?.children.length || 0,
          innerHTML: updatedContainer?.innerHTML.substring(0, 200) || 'empty'
        });

        // Mark as loaded
        setIsLoaded(true);
        setError(null);

        if (onReady) {
          onReady();
        }

        console.log('🎉 Univer initialized successfully for', artifactType);
      }, 500);

    } catch (error: unknown) {
      console.error('❌ Error initializing Univer:', error);
      if (error instanceof Error) {
        console.error('Error stack:', error.stack);
        setError(`Failed to initialize Univer: ${error.message}`);
      } else {
        setError('Failed to initialize Univer: Unknown error');
      }
      setIsLoaded(false);
    }
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center">
          <div className="text-red-600 font-medium mb-2">Error Loading Viewer</div>
          <div className="text-sm text-red-500">{error}</div>
          <button
            onClick={() => {
              setError(null);
              initializeUniver();
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-white" style={{ minHeight: '400px' }}>
      <div
        id={containerId}
        className="w-full h-full"
        style={{
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}
      />
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
            <div className="text-sm text-gray-600">Loading {artifactType} viewer...</div>
            <div className="text-xs text-gray-400 mt-2">Container: {containerId}</div>
          </div>
        </div>
      )}
      {isLoaded && (
        <div className="absolute top-2 right-2 z-20 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
          Univer Loaded ✓
        </div>
      )}
    </div>
  );
};
