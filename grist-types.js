/**
 * Grist API Type Definitions for Monaco IntelliSense
 * Provides auto-completion for grist.* methods
 */

window.GRIST_TYPES_DTS = `
declare namespace grist {
  /**
   * Initialise le widget Grist avec les permissions requises
   * @param options Options d'initialisation
   */
  function ready(options?: {
    requiredAccess?: 'read table' | 'full' | 'none' | '';
    columns?: Array<string | { name: string; title?: string; type?: string; optional?: boolean }>;
    allowSelectBy?: boolean;
    onEditOptions?: () => void;
  }): void;

  /**
   * Callback appelé quand un record est sélectionné dans la table liée
   * @param callback Fonction recevant le record sélectionné
   */
  function onRecord(callback: (record: any | null, mappings?: any) => void): void;

  /**
   * Callback appelé avec tous les records de la table liée
   * @param callback Fonction recevant la liste des records
   */
  function onRecords(callback: (records: any[], mappings?: any) => void): void;

  /**
   * Callback appelé pour les nouveaux records (mode form)
   */
  function onNewRecord(callback: () => void): void;

  /**
   * Callback appelé quand les options du widget changent
   */
  function onOptions(callback: (options: any, settings: any) => void): void;

  /**
   * Sauvegarde les options du widget dans le document
   */
  function setOptions(options: any): Promise<void>;

  /**
   * Récupère les options sauvegardées
   */
  function getOptions(): Promise<any>;

  /**
   * Récupère le nom de la table liée au widget
   */
  function getTable(): Promise<string>;

  /**
   * Récupère un token d'accès pour les API REST Grist
   */
  function getAccessToken(options?: { readOnly?: boolean }): Promise<{
    token: string;
    baseUrl: string;
    ttlMsecs: number;
  }>;

  /**
   * API du document Grist
   */
  const docApi: {
    /**
     * Récupère toutes les lignes d'une table
     * @param tableId Nom de la table
     */
    fetchTable(tableId: string): Promise<Record<string, any[]>>;

    /**
     * Liste toutes les tables du document
     */
    listTables(): Promise<string[]>;

    /**
     * Applique des actions utilisateur (CRUD)
     * Actions supportées :
     * - ['AddRecord', tableId, rowId | null, {col: value}]
     * - ['UpdateRecord', tableId, rowId, {col: value}]
     * - ['RemoveRecord', tableId, rowId]
     * - ['BulkAddRecord', tableId, [null, null], {col: [v1, v2]}]
     * - ['BulkUpdateRecord', tableId, [id1, id2], {col: [v1, v2]}]
     * - ['BulkRemoveRecord', tableId, [id1, id2]]
     * - ['AddTable', tableId, [{id, type}]]
     * - ['AddColumn', tableId, colId, {type}]
     * - ['ModifyColumn', tableId, colId, {type}]
     * - ['RemoveColumn', tableId, colId]
     */
    applyUserActions(actions: any[][]): Promise<any>;

    /**
     * Récupère les valeurs de sélection d'une colonne de choix
     */
    getAccessToken(options?: { readOnly?: boolean }): Promise<any>;
  };

  /**
   * API de sélection des cellules/records
   */
  const selectedTable: {
    create: {
      Record(record: any, mappings: any): Promise<any>;
    };
    update: (record: any) => Promise<any>;
    destroy: (rowId: number) => Promise<any>;
  };

  /**
   * Map des colonnes selon la configuration du widget
   */
  function mapColumnNames(data: any, mappings?: any): any;
  function mapColumnNamesBack(data: any): any;

  /**
   * Définit le curseur de la table liée
   */
  function setCursorPos(pos: { rowId?: number; sectionId?: number }): Promise<void>;

  /**
   * Permet de définir la section courante comme liée
   */
  function allowSelectBy(): void;

  /**
   * Ouvre le panneau de configuration
   */
  function openOptions(): Promise<void>;

  /**
   * Widget API pour afficher des messages
   */
  const widgetApi: {
    showNotification(message: string, type?: 'info' | 'error' | 'warning'): void;
  };
}
`;
