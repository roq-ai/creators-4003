const mapping: Record<string, string> = {
  directories: 'directory',
  posts: 'post',
  profiles: 'profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
