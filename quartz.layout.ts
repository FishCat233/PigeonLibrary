import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SortFn } from "./quartz/components/PageList"

/**排序 */
const byModifiedDateAndAlphabetical: SortFn = (f1, f2): number => {
  // Sort by date/alphabetical
  if (f1.dates && f2.dates) {
    // sort descending
    return f2.dates?.modified!.getTime() - f1.dates?.modified!.getTime()
  } else if (f1.dates && !f2.dates) {
    // prioritize files with dates
    return -1
  } else if (!f1.dates && f2.dates) {
    return 1
  }

  // otherwise, sort lexographically by title
  const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
  const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
  return f1Title.localeCompare(f2Title)
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'FishCat233/FishCat233Library',
        // from data-repo-id
        repoId: 'R_kgDON-tQ1g',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDON-tQ1s4CwGvI',
        // map
        mapping: 'pathname',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/FishCat233",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.Explorer({
      folderDefaultState: 'collapsed',
    }),
  ],
  right: [
    // Component.Graph(), //等用明白obs在考虑图吧
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({
      limit: 6,
      sort: byModifiedDateAndAlphabetical,
    }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
