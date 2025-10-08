import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { ModeToggle } from '../Buttons/toggle-theme-button';

const navigation: { name: string; href: string }[] = [
	{ name: 'Senaste', href: '#' },
	{ name: 'Inrikes', href: '#' },
	{ name: 'Världen', href: '#' },
	{ name: 'Ekonomi', href: '#' },
	{ name: 'Sport', href: '#' },
	{ name: 'Väder', href: '#' },
];

export function Navbar(): React.ReactElement {
	return (
		<header className="bg-card shadow-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
					{/* Logo och Titel-sektion */}
					<Link href="/" className="flex items-center space-x-3">
						{/* <div className="relative h-12 w-12">
							<Image
								src="/loggo.png"
								alt="Dagens Dos Logga"
								fill
								className="object-contain"
							/>
						</div> */}
						<div className="flex flex-col">
							<h1 className="text-3xl font-extrabold tracking-tight text-foreground">
								Dagens Dos
							</h1>
							<p className="text-sm italic text-muted-foreground mt-1">
								Sanningen gör ont, här får du en bedövning.
							</p>
						</div>
					</Link>

					{/* Huvudnavigering (Desktop) - server-rendered links */}
					<nav className="hidden md:flex space-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="whitespace-nowrap text-base font-medium text-muted-foreground hover:text-primary"
							>
								{item.name}
							</Link>
						))}
					</nav>

					{/* Autentisering och Prenumeration (Desktop) - enkla länkar utan client-js */}
					<div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-3">
						<Link
							href="#"
							className="whitespace-nowrap text-base font-medium text-foreground hover:text-primary"
						>
							Logga in
						</Link>
						<Link
							href="#"
							className="inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90"
						>
							Prenumerera
						</Link>
						<ModeToggle />
					</div>

					{/* Mobil: native disclosure (ingen JS krävs) */}
					<div className="md:hidden">
						<details className="relative">
							<summary className="flex items-center gap-3 cursor-pointer list-none py-2 px-3 rounded-md hover:bg-muted/50">
								<svg
									className="h-6 w-6 text-muted-foreground"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
								<span className="sr-only">Öppna meny</span>
							</summary>

							<nav className="absolute left-4 right-4 mt-2 z-50 bg-card rounded-md p-4 shadow-lg space-y-3">
								<div className="flex flex-col space-y-2">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="block text-base font-medium text-foreground hover:text-primary"
										>
											{item.name}
										</Link>
									))}
								</div>

								<div className="pt-2 border-t border-muted-foreground/20 flex flex-col gap-2">
									<Link
										href="#"
										className="block text-base font-medium text-foreground hover:text-primary"
									>
										Logga in
									</Link>
									<Link
										href="#"
										className="inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-primary-foreground bg-primary hover:bg-primary/90"
									>
										Prenumerera
									</Link>
									<div className="pt-2">
										<ModeToggle />
									</div>
								</div>
							</nav>
						</details>
					</div>
				</div>
			</div>
		</header>
	);
}
