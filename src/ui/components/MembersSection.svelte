<script lang="ts">
  import type { TeamMember } from '@contracts/portfolio';

  interface Props {
    members: readonly TeamMember[];
  }

  let { members }: Props = $props();
  let failedAvatars = $state<Record<string, boolean>>({});

  function markAvatarFailed(id: string): void {
    failedAvatars = { ...failedAvatars, [id]: true };
  }
</script>

<section id="miembros" class="card-section" aria-label="Miembros del equipo">
  <div class="section-header compact-header">
    <span class="eyebrow">Equipo</span>
    <h2 class="section-title">Las mentes detrás de Purpool Studios.</h2>
    <p class="section-subtitle">
      Un colectivo multidisciplinario donde la ingeniería de sistemas de bajo nivel y el diseño visual de videojuegos se integran en cada proyecto.
    </p>
  </div>

  <div class="members-grid">
    {#each members as member (member.id)}
      <article class="member-card" style="--member-accent: {member.accentHex}">
        <header class="member-head">
          <div class="avatar-frame">
            {#if !failedAvatars[member.id]}
              <img
                src={member.avatarUrl}
                alt={`Avatar de ${member.handle}`}
                class="member-avatar"
                loading="lazy"
                onerror={() => markAvatarFailed(member.id)}
              />
            {:else}
              <span class="avatar-fallback" aria-hidden="true">
                {member.handle.slice(0, 2).toUpperCase()}
              </span>
            {/if}
          </div>

          <div class="member-identity">
            <h3 class="member-handle">{member.handle}</h3>
            <p class="member-role">{member.role}</p>
          </div>
        </header>

        <p class="member-summary">{member.summary}</p>

        <div class="skills-block">
          <span class="skills-kicker">Competencias y alcance</span>
          <ul class="skills-list">
            {#each member.skills as item (item.skill)}
              <li class="skill-item">
                <strong class="skill-name">{item.skill}</strong>
                <p class="skill-desc">{item.explanation}</p>
              </li>
            {/each}
          </ul>
        </div>

        <div class="member-tags">
          {#each member.tags as tag}
            <span class="member-tag">{tag}</span>
          {/each}
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .card-section {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .compact-header {
    margin-bottom: 0;
  }

  .members-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.4rem;
  }

  .member-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem 1.6rem;
    border-radius: 22px;
    background: rgba(20, 15, 32, 0.74);
    border: 1px solid rgba(196, 168, 255, 0.14);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: border-color 0.25s ease, transform 0.25s ease;
  }

  .member-card:hover {
    border-color: color-mix(in srgb, var(--member-accent) 45%, transparent);
    transform: translateY(-2px);
  }

  .member-head {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .avatar-frame {
    width: 62px;
    height: 62px;
    border-radius: 9999px;
    padding: 2px;
    background: linear-gradient(135deg, var(--member-accent), rgba(168, 85, 247, 0.35));
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .member-avatar {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    object-fit: cover;
    background: #120d1e;
  }

  .avatar-fallback {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background: #151024;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.05rem;
  }

  .member-identity {
    min-width: 0;
  }

  .member-handle {
    margin: 0;
    font-size: 1.32rem;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: -0.015em;
  }

  .member-role {
    margin: 0.15rem 0 0;
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--member-accent);
  }

  .member-summary {
    margin: 0;
    font-size: 0.94rem;
    color: var(--text-secondary);
    line-height: 1.55;
  }

  .skills-block {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    padding-top: 0.85rem;
    border-top: 1px solid rgba(196, 168, 255, 0.1);
    flex: 1;
  }

  .skills-kicker {
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .skills-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  .skill-item {
    padding: 0.65rem 0.85rem;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(196, 168, 255, 0.08);
  }

  .skill-name {
    display: block;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-primary);
  }

  .skill-desc {
    margin: 0.2rem 0 0;
    font-size: 0.84rem;
    color: var(--text-secondary);
    line-height: 1.48;
  }

  .member-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .member-tag {
    padding: 0.24rem 0.65rem;
    border-radius: 9999px;
    font-size: 0.74rem;
    font-weight: 700;
    color: var(--text-secondary);
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(196, 168, 255, 0.14);
  }

  @media (max-width: 920px) {
    .members-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
