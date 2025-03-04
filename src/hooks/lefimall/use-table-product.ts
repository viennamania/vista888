import { useState, useEffect, useMemo } from 'react';
import isString from 'lodash/isString';


import { useSession, signOut } from 'next-auth/react';
import { set } from 'lodash';





interface AnyObject {
  [key: string]: any;
}





export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>
) {



  const { data: session, status } = useSession();

  ///console.log("use-table-products session:", session);

    /* fetch user data from an API
  /api/doingdoit/user/getUser
  */
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    name: "",
    nickname: "",
    avatar: "",
    shopId: "",
  });

  const [loadingUserData, setLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      if (!session?.user?.email) {
        return;
      }

      setLoadingUserData(true);

      try {
        const res = await fetch(`/api/corky/user/getUserByEmail?_email=${session?.user?.email}`);
        const json = await res?.json();

        const data = json as any;

        /////console.log('data ->', data);
        
        if (data.data) {
          setUserData(data.data);
        } else {
          //alert(json.message);
        }

      } catch (error) {
        console.log(error);
      }

      setLoadingUserData(false);
    };

    fetchData();
  } , [session?.user?.email]);





  /*
    id: string,
  createdAt: string,
  name: string,
  companyName: string,
  shopId: string,
  category: string,
  image: string,
  sku: string,
  listPrice: number,
  price: number,
  status: string,
  rating: number[],
  point: number,
  stock: number,
  sales: number,
  inquiry: number,
  */


  const [searchTerm, setSearchTerm] = useState('');

  ////const [selectedShopId, setSelectedShopId] = useState('');

  /*
   * Table data
   */
  const [data, setData] = useState(initialData);

  /*
  * Dummy loading state.
  */
  const [isLoading, setLoading] = useState(true);

    


  const fetchData = async (

    shopId: string = '',
    
  ) => {


    setLoading(true);

    if (userData?.shopId) {

      ////const res = await fetch(`/api/corky/product/getAllByShopId?_limit=10&_page=1&_sort=createdAt&_order=-1&_q=${searchTerm}&_shopId=${userData?.shopId}`);


      const res = await fetch(`/api/corky/product/getAll?_limit=10&_page=1&_sort=createdAt&_order=-1&_q=${searchTerm}&_shopId=${userData?.shopId}`);


      const posts  = await res.json() as any;

      
      
      ///console.log(posts.data);

      setData(posts.data);


    } else {

      const res = await fetch(`/api/corky/product/getAll?_limit=10&_page=1&_sort=createdAt&_order=-1&_q=${searchTerm}&_shopId=${shopId}`);

      const posts  = await res.json() as any;
      
      ///console.log(posts.data);

      setData(posts.data);

    }

    setLoading(false);

  };


  useEffect(() => {

    fetchData();
  }
  ,[ searchTerm, userData?.shopId,]);


  /*
  useEffect(() => {
    setLoading(false);
  }, []);
  */


  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter((key) => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map((record) => record.id));
    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    let newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);



  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }


  /*
   * Handle pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  function paginatedData(data: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }


  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }



  /*
   * Handle delete
   */
  function handleDelete(id: string | string[]) {

    const updatedData = Array.isArray(id)
      ? data.filter((item) => !id.includes(item.id))
      : data.filter((item) => item.id !== id);

    setData(updatedData);
    
  }



  /*
   * Handle Filters and searching
   */


  const [filters, setFilters] = useState<Record<string, any>>(
    initialFilterState ?? {}
  );


  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
  }


  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter((item) => {
          const isMatchingItem = Object.entries(filters).some(
            ([columnId, filterValue]) => {
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'object'
              ) {
                const itemValue = new Date(item[columnId]);
                return (
                  // @ts-ignore
                  itemValue >= filterValue[0] && itemValue <= filterValue[1]
                );
              }
              if (
                Array.isArray(filterValue) &&
                typeof filterValue[1] === 'string'
              ) {
                const itemPrice = Math.ceil(Number(item[columnId]));
                return (
                  itemPrice >= Number(filterValue[0]) &&
                  itemPrice <= Number(filterValue[1])
                );
              }
              if (isString(filterValue) && !Array.isArray(filterValue)) {
                const itemValue = item[columnId]?.toString().toLowerCase();
                if (itemValue !== filterValue.toString().toLowerCase()) {
                  return false;
                }
                return true;
              }
            }
          );
          return isMatchingItem;
        })
        // global search after running filters
        .filter((item) =>
          Object.values(item).some((value) =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  (nestedItem) =>
                    nestedItem &&
                    String(nestedItem).toLowerCase().includes(searchTermLower)
                )
              : value && String(value).toLowerCase().includes(searchTermLower)
          )
        )
    );
  }











  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {

    console.log("handleSearch searchValue:", searchValue);
    
    setSearchTerm(searchValue);

    fetchData('');

  }

  /*
   * Handle select shop
   */
  function handleSelectedShopId(shopId: any) {

    console.log("handleSelectedShopId shopId:", shopId);

    console.log("handleSelectedShopId shopId.value:", shopId.value);

    ///setSelectedShopId(shopId.value);

    fetchData(shopId.value);

  }


  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              (nestedItem) =>
                nestedItem &&
                String(nestedItem).toLowerCase().includes(searchTermLower)
            )
          : value && String(value).toLowerCase().includes(searchTermLower)
      )
    );

  }

  

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  const isFiltered = applyFilters().length > 0;

  function calculateTotalItems() {
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData.length;
  }
  
  const filteredAndSearchedData = isFiltered ? applyFilters() : searchedData();

  const tableData = paginatedData(filteredAndSearchedData);


  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {




    handlePaginate(1);
  }, [isFiltered, searchTerm]);




  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,

    // searching
    searchTerm,
    handleSearch,

    handleSelectedShopId,

    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
    
  };
}
