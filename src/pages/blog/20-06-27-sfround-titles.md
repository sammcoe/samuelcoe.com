---
templateKey: blog-post
title: SF Rounded navigation bar titles in SwiftUI and UIKit
date: 2020-06-27T12:25:00.000Z
featuredpost: false
description:
tags:
  - swift
  - iOS
---

With iOS 13, a number of system apps began using the rounded variation of SF Pro for navigation bar titles. This rounded look provides a nice alternative, native feel for apps that wish to adopt it.

Unfortunately, it can be a little hard to come up with the means to adapt your own UIKit or SwiftUI navigation bar titles to use it.

Here's a quick rundown on how to accomplish this using both frameworks:

## UIKit

```swift
if let roundedTitleDescriptor = UIFontDescriptor
  .preferredFontDescriptor(withTextStyle: .largeTitle)
  .withDesign(.rounded)?
  .withSymbolicTraits(.traitBold) {
    self.navigationController? // Assumes a navigationController exists on the current view
      .navigationBar
      .largeTitleTextAttributes = [
        .font: UIFont(descriptor: roundedTitleDescriptor, size: 0) // Note that 'size: 0' maintains the system size class
      ]
}
```

## SwiftUI

SwiftUI makes this really easy. Just attach the `.font` modifier to the `Text` view for your navigation bar title, and give it the `.system(.largeTitle, design: .rounded)` argument.

```swift
NavigationView {
  VStack { ... }
    .navigationBarTitle(
      Text("Your View")
        .font(.system(.largeTitle, design: .rounded))
    )
}
```
