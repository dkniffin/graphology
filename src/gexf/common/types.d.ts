import {Attributes} from 'graphology-types';

export type GexfParserOptions = {
  addMissingNodes?: boolean;
  allowUndeclaredAttributes?: boolean;
};

type RGBAColor = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

type VizRecord = {
  color?: RGBAColor | string;
  size?: number;
  x?: number;
  y?: number;
  z?: number;
  shape?: string;
  thickness?: number;
};

type FormattedNode<FormattedAttributes> = {
  label?: string;
  viz?: VizRecord;
  attributes?: FormattedAttributes;
};

type FormattedEdge<FormattedAttributes> = {
  label?: string;
  viz?: VizRecord;
  weight?: number;
  attributes?: FormattedAttributes;
  kind?: string;
};

export type NodeFormatter<
  NodeAttributes extends Attributes = Attributes,
  FormattedAttributes extends Attributes = Attributes
> = (
  key: string,
  attributes: NodeAttributes
) => FormattedNode<FormattedAttributes>;

export type EdgeFormatter<
  EdgeAttributes extends Attributes = Attributes,
  FormattedAttributes extends Attributes = Attributes
> = (
  key: string,
  attributes: EdgeAttributes
) => FormattedEdge<FormattedAttributes>;

export type GexfVersion = '1.2' | '1.3';

export type GexfWriterOptions<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  FormattedNodeAttributes extends Attributes = Attributes,
  FormattedEdgeAttributes extends Attributes = Attributes
> = {
  encoding?: string;
  pretty?: boolean;
  version?: GexfVersion;
  pedantic?: boolean;
  formatNode?: NodeFormatter<NodeAttributes, FormattedNodeAttributes>;
  formatEdge?: EdgeFormatter<EdgeAttributes, FormattedEdgeAttributes>;
};
