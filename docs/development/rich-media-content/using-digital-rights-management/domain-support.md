---
sidebar_position: 10
---

# Domain support

If the content metadata specifies that domain registration is required, the AIR
application can invoke an API to join a device group. This action triggers a
domain registration request to be sent to the domain server. Once a license is
issued to a device group, the license can be exported and shared with other
devices that have joined the device group.

The device group information is then used in the `DRMContentData`'s `V`
`oucherAccessInfo` object, which will then be used to present the information
that is required to successfully retrieve and consume a voucher.
