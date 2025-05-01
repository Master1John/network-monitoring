"use client";

import { useEffect, useState } from "react";
import { CircleHelp, Save, Shield, ShieldAlert, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample user permissions data
const userPermissionsData = {
  "user-001": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-002": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-003": {
    role: "admin",
    permissions: {
      dashboard: {
        view: true,
        edit: true,
      },
      users: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      devices: {
        view: true,
        create: true,
        edit: true,
        delete: true,
      },
      keylogs: {
        view: true,
        export: true,
        delete: true,
      },
      network: {
        view: true,
        configure: true,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: true,
        edit: true,
      },
    },
  },
  "user-008": {
    role: "user",
    permissions: {
      dashboard: {
        view: true,
        edit: false,
      },
      users: {
        view: false,
        create: false,
        edit: false,
        delete: false,
      },
      devices: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      keylogs: {
        view: false,
        export: false,
        delete: false,
      },
      network: {
        view: false,
        configure: false,
      },
      security: {
        view: false,
        configure: false,
      },
      settings: {
        view: false,
        edit: false,
      },
    },
  },
  "user-012": {
    role: "security",
    permissions: {
      dashboard: {
        view: true,
        edit: false,
      },
      users: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      devices: {
        view: true,
        create: false,
        edit: false,
        delete: false,
      },
      keylogs: {
        view: true,
        export: true,
        delete: false,
      },
      network: {
        view: true,
        configure: false,
      },
      security: {
        view: true,
        configure: true,
      },
      settings: {
        view: false,
        edit: false,
      },
    },
  },
};

export function UserPermissions({ userId }: { userId: string }) {
  const [userPermissions, setUserPermissions] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data =
        userPermissionsData[userId as keyof typeof userPermissionsData];
      setUserPermissions(data || null);
      if (data) {
        setRole(data.role);
        setPermissions(data.permissions);
      }
      setLoading(false);
    }, 500);
  }, [userId]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    // In a real app, you would update permissions based on the selected role
  };

  const handlePermissionChange = (
    section: string,
    permission: string,
    checked: boolean,
  ) => {
    setPermissions((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [permission]: checked,
      },
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call to save permissions
    setTimeout(() => {
      setIsSaving(false);
      // Show success message or handle response
    }, 1000);
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "admin":
        return <Shield className="h-5 w-5" />;
      case "security":
        return <ShieldAlert className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  if (loading) {
    return <div>Loading permissions...</div>;
  }

  if (!userPermissions) {
    return <div>User permissions not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">User Role</h3>
          <p className="text-sm text-muted-foreground">
            The role determines the base set of permissions for this user
          </p>
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={role} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Administrator</span>
                </div>
              </SelectItem>
              <SelectItem value="security">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" />
                  <span>Security Analyst</span>
                </div>
              </SelectItem>
              <SelectItem value="user">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Standard User</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-medium">Detailed Permissions</h3>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>
                Permissions for dashboard access and management
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dashboard-view"
                    checked={permissions.dashboard?.view}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("dashboard", "view", !!checked)
                    }
                  />
                  <label
                    htmlFor="dashboard-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    View Dashboard
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to view the dashboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dashboard-edit"
                    checked={permissions.dashboard?.edit}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("dashboard", "edit", !!checked)
                    }
                  />
                  <label
                    htmlFor="dashboard-edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Edit Dashboard
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Allow user to customize and edit dashboard components
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Permissions for user management</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="users-view"
                    checked={permissions.users?.view}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("users", "view", !!checked)
                    }
                  />
                  <label
                    htmlFor="users-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    View Users
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to view other users in the system</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="users-create"
                    checked={permissions.users?.create}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("users", "create", !!checked)
                    }
                  />
                  <label
                    htmlFor="users-create"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Create Users
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to create new user accounts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="users-edit"
                    checked={permissions.users?.edit}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("users", "edit", !!checked)
                    }
                  />
                  <label
                    htmlFor="users-edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Edit Users
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to edit existing user accounts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="users-delete"
                    checked={permissions.users?.delete}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("users", "delete", !!checked)
                    }
                  />
                  <label
                    htmlFor="users-delete"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Delete Users
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to delete user accounts</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Devices</CardTitle>
              <CardDescription>
                Permissions for device management
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="devices-view"
                    checked={permissions.devices?.view}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("devices", "view", !!checked)
                    }
                  />
                  <label
                    htmlFor="devices-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    View Devices
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to view devices in the system</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="devices-create"
                    checked={permissions.devices?.create}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("devices", "create", !!checked)
                    }
                  />
                  <label
                    htmlFor="devices-create"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Add Devices
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to add new devices to the system</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="devices-edit"
                    checked={permissions.devices?.edit}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("devices", "edit", !!checked)
                    }
                  />
                  <label
                    htmlFor="devices-edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Edit Devices
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to edit device configurations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="devices-delete"
                    checked={permissions.devices?.delete}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("devices", "delete", !!checked)
                    }
                  />
                  <label
                    htmlFor="devices-delete"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Delete Devices
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to remove devices from the system</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keylogs</CardTitle>
              <CardDescription>
                Permissions for keylog access and management
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keylogs-view"
                    checked={permissions.keylogs?.view}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("keylogs", "view", !!checked)
                    }
                  />
                  <label
                    htmlFor="keylogs-view"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    View Keylogs
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to view keylog data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keylogs-export"
                    checked={permissions.keylogs?.export}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("keylogs", "export", !!checked)
                    }
                  />
                  <label
                    htmlFor="keylogs-export"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Export Keylogs
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to export keylog data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keylogs-delete"
                    checked={permissions.keylogs?.delete}
                    onCheckedChange={(checked) =>
                      handlePermissionChange("keylogs", "delete", !!checked)
                    }
                  />
                  <label
                    htmlFor="keylogs-delete"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Delete Keylogs
                  </label>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Allow user to delete keylog data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Permissions
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
