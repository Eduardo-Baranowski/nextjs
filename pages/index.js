import Link from 'next/link';
import React from 'react';
import styled from 'styled-components'
import Footer from '../components/Footer';

const Subtitle = styled.h2`
  background-color: var(--primary);
  color: white;
  display: inline-block;
  padding: 5px;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

export default function Home(props) {
  console.log(props);
  return (
    <div>
      <header className="headerContainer">      
      <img src={props.avatar_url} />
      <Link href="/sobre">
        <a>
          <h1>Eduardo Baranowski Repos</h1>
        </a>
      </Link>
      </header>

      <section className="postsContainer">
        <Subtitle>Posts</Subtitle>
        <article className="postsContainer_post">
          <a href="/">
            Elencando os repositórios pinados!
          </a>
          <p>
            Lista de descrição dos repósitórios pinados!
          </p> 
        </article>
      </section>

      <section className="postsContainer">
        <Subtitle>Repositórios Favoritos</Subtitle>
        {
          props.repos.map((project) => {
            return (
              <article 
                key={project.repo}
                className="postsContainer_post">
                <a href="/">
                  {project.repo}
                </a>
                <p>
                  {project.description}
                </p> 
              </article>
            )
          })
        }
      </section>

        <Footer />
      
    </div>
  )
}

export async function getStaticProps(context) {

  const githubResponse = await fetch('https://api.github.com/users/Eduardo-Baranowski').then(res => res.json())

  const repos = await fetch('https://gh-pinned-repos.now.sh/?username=Eduardo-Baranowski').then(res => res.json())
  return {
    props: {
      avatar_url: githubResponse.avatar_url,
      repos,
    }, // will be passed to the page component as props
  }
}
