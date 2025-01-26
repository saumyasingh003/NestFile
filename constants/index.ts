
  
  export const actionsDropdownItems = [
    {
      label: "Rename",
      icon: "/assets/edit.svg",
      value: "rename",
    },
    {
      label: "Details",
      icon: "/assets/info.svg",
      value: "details",
    },
    {
      label: "Share",
      icon: "/assets/share.svg",
      value: "share",
    },
    {
      label: "Download",
      icon: "/assets/download.svg",
      value: "download",
    },
    {
      label: "Delete",
      icon: "/assets/delete.svg",
      value: "delete",
    },
  ];
  
  export const sortTypes = [
    {
      label: "Date created (newest)",
      value: "$createdAt-desc",
    },
    {
      label: "Created Date (oldest)",
      value: "$createdAt-asc",
    },
    {
      label: "Name (A-Z)",
      value: "name-asc",
    },
    {
      label: "Name (Z-A)",
      value: "name-desc",
    },
    {
      label: "Size (Highest)",
      value: "size-desc",
    },
    {
      label: "Size (Lowest)",
      value: "size-asc",
    },
  ];
  
  export const avatarPlaceholderUrl =
    "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg";
  
  export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB