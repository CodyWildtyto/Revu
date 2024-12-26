import Link from 'next/link';

import { Card } from '@/components/Card';
import Page from '@/components/Page';

export default function Index() {
  return (
    <Page className="items-center">
      <h1 className="grow">Rev:u</h1>
      <Card className="basis-96">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <Link href="/review">
              <button className="btn btn-primary btn-block">Login</button>
            </Link>
          </div>
        </form>
      </Card>
    </Page>
  );
}
