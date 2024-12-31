export type Options = {
    /**
     * Get data by authorization by some property called user_id or the `idKey` specified
     * @default true
     */
    byAuth?: boolean,

    /**
     * Property working by authorization
     * @default "user_id"
     */
    idKey?: string,

    /**
     * Filters data if `idKey` property exist or not
     * @default true
     * @description If sets `false` the documents returned if `idKey` is equal to 
     * authorized user id or if `idKey` no exist in collection, ideal if wants to return
     * documents not created by users and/or created by specific user
     */
    existIdKey?: boolean,

    /**
     * More custom filter data
     */
    filter?: object,

    /**
     * Excludes a property or properties of returned documents
     */
    excludes?: string | string[],
}