import os

route_code = '''import { auth } from "@/lib/better-auth.config";

export async function GET(request: Request) {
  return auth.handler(request);
}

export async function POST(request: Request) {
  return auth.handler(request);
}
'''

routes = ['callback', 'error', 'session', 'sign-in', 'sign-out', 'sign-up']

for route in routes:
    path = f'src/app/api/auth/{route}'
    os.makedirs(path, exist_ok=True)
    with open(f'{path}/route.ts', 'w') as f:
        f.write(route_code)
    print(f'✅ Skapade {path}/route.ts')

print('\n✅ Alla routes skapade!')
