import Link from 'next/link';
import { CardLayout, PageLayout } from './layout';

export default function Home() {
  return (
    <PageLayout className="items-center">
      <div className="grow text-6xl text-white">Rev:u</div>
      <CardLayout className="basis-96">
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
            <Link href="/reviews">
              <button className="btn btn-primary btn-block">Login</button>
            </Link>
          </div>
        </form>
      </CardLayout>
    </PageLayout>
  );
}
