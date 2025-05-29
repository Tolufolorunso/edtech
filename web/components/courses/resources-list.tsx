import type { Resource } from "@/store/lesson-store"
import styles from "./resources-list.module.css"

interface ResourcesListProps {
  resources: Resource[]
}

export default function ResourcesList({ resources }: ResourcesListProps) {
  if (resources.length === 0) {
    return <div className={styles.empty}>No resources available for this lesson.</div>
  }

  // Group resources by type
  const groupedResources = resources.reduce(
    (acc, resource) => {
      if (!acc[resource.type]) {
        acc[resource.type] = []
      }
      acc[resource.type].push(resource)
      return acc
    },
    {} as Record<string, Resource[]>,
  )

  // Get type labels
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF Documents"
      case "doc":
        return "Documents"
      case "link":
        return "Links"
      case "note":
        return "Notes"
      case "assignment":
        return "Assignments"
      default:
        return type.charAt(0).toUpperCase() + type.slice(1)
    }
  }

  // Get icon for resource type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "doc":
        return "📝"
      case "link":
        return "🔗"
      case "note":
        return "📌"
      case "assignment":
        return "📚"
      default:
        return "📁"
    }
  }

  return (
    <div className={styles.resourcesList}>
      {Object.entries(groupedResources).map(([type, typeResources]) => (
        <div key={type} className={styles.resourceGroup}>
          <h3 className={styles.resourceType}>
            {getTypeIcon(type)} {getTypeLabel(type)}
          </h3>
          <ul className={styles.resourceItems}>
            {typeResources.map((resource) => (
              <li key={resource._id} className={styles.resourceItem}>
                {resource.url ? (
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                    {resource.title}
                  </a>
                ) : (
                  <div className={styles.resourceContent}>
                    <h4 className={styles.resourceTitle}>{resource.title}</h4>
                    {resource.content && <p className={styles.resourceText}>{resource.content}</p>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
