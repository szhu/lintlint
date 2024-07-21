interface EslintOptions {
  rules?: Record<string, unknown>;
  parserOptions?: EslintParserOptions;
  env?: Record<string, boolean>;
  globals?: Record<string, boolean>;
  parser?: string;
  processor?: string;
  plugins?: string[];
  settings?: Record<string, unknown>;
}

export interface EslintConfig extends EslintOptions {
  extends?: string | string[];
  overrides?: EslintOverride[];
}

interface EslintOverride extends EslintOptions {
  files: string | string[];
}

interface EslintParserOptions {
  ecmaVersion?: number;
  sourceType?: "script" | "module";
  ecmaFeatures?: {
    jsx?: boolean;
  };
}
